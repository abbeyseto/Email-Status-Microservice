import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyHandler } from "aws-lambda";

//import db connection
const { connectToDatabase } = require("../db");

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const { getAWSAccountId } = require("../keyStoreModule");
const crypto = require("crypto");
const sns = new AWS.SNS();

const { getMailgunAPIKey } = require("../keyStoreModule");

interface SnsParameter {
  Message: string;
  Subject?: string;
  TopicArn: string;
}

interface Payload {
  Provider: string;
  timestamp: string | number;
  type: string;
}

/**
 *  The verify function Checks and validate that the webhook came from Mailgun
 * @param param0
 * @returns
 */
const verify = ({ signingKey, timestamp, token, signature }): Boolean => {
  const encodedToken = crypto
    .createHmac("sha256", signingKey)
    .update(timestamp.concat(token))
    .digest("hex");
  return encodedToken === signature;
};

/**
 * Lambda that accepts Email status events from mailgun
 * It transforms and publish to SNS
 * A copy of the event is saved in a database
 * @param event
 * @param _context
 * @returns
 */
const webhook: APIGatewayProxyHandler = async (event, _context) => {
  let body = JSON.parse(event.body);
  let message: string;

  const apiKey: string = await getMailgunAPIKey();
  const signingKey = apiKey;

  // Get a MongoDBClient.
  const client = await connectToDatabase();

  // Verify if event is from mailgun
  try {
    const { timestamp , token, signature }:{timestamp:string, token:string, signature:string} = body.signature;
    const verifyEvent: Boolean = verify({ signingKey, timestamp, token, signature });

    if (!verifyEvent) {
      console.log("Could not verify this request is from mailgun");
      return formatJSONResponse._400({
        message: "Could not verify this request is from mailgun",
      });
    }
  } catch (error) {
    console.log(error.message, error.stack);
    if (error instanceof TypeError) {
      // This occurs if timestamp, token or signature is not present in body.signature
      return formatJSONResponse._400({
        message: "This is a fraudulent request",
      });
    }
    return formatJSONResponse._400({ message: "Request not permitted" });
  }

  //Get AWS AccountID stored using parameter store
  const accountId: string = await getAWSAccountId();

  //validate payload with interface typing
  const payload: Payload = {
    Provider: "Mailgun",
    timestamp: body.signature.timestamp || "No time stamp",
    type: `Email ${body["event-data"].event}` || "delivered status unknown",
  };

  // Validate SNS parameter to be sent using interface typing
  const params: SnsParameter = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:${accountId}:emailStatuses`,
  };

  //Publish SNS message
  try {
    sns.publish(params).promise();
    console.log("push sent");
    console.log(payload);
    message = "Success";
    // Inserts incoming webhook event to database
    const mailgunEvents = client
      .db("email-tracker")
      .collection("mailgun-events");
    let dbOperation = mailgunEvents.insertOne(body);
    if (dbOperation) {
      console.log("event inseted in database");
    }
    return formatJSONResponse._200({ message: message });
  } catch (error) {
    console.log(error.message);
    message = "Error occured";
    return formatJSONResponse._400({ message: message });
  }
};
export const main = webhook;
