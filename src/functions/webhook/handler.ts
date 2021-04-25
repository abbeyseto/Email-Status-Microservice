import "source-map-support/register";
// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
// import { middyfy } from "@libs/lambda";
// import schema from "./schema";
import { APIGatewayProxyHandler } from "aws-lambda";

//import db connection
const { connectToDatabase } = require("../db");

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const config = require("../config");
const sns = new AWS.SNS();

const webhook: APIGatewayProxyHandler = async (event, _context) => {
  let body = JSON.parse(event.body);
  let message: string;
  //validate payload with interface typing
  const payload: Payload = {
    Provider: "Mailgun",
    timestamp: body.signature.timestamp || "No time stamp",
    type: `Email ${body["event-data"].event}` || "delivered status unknown",
  };

  // Validate SNS parameter to be sent using interface typing
  const params: SnsParameter = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:${config.awsAccountId}:emailStatuses`,
  };

  // Get a MongoClient.
  const client = await connectToDatabase();
  /**
   * Publish SNS message
   */
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
    if (dbOperation && dbOperation.id) {
      console.log("event inseted in database");
    }
    return formatJSONResponse._200({ message: message });
  } catch (error) {
    console.log(error.message);
    message = "Error occured";
    return formatJSONResponse._400({ message: message });
  }
};

interface SnsParameter {
  Message: string;
  Subject?: string;
  TopicArn: string;
}

interface Payload {
  Provider: string;
  timestamp: string | number | any;
  type: unknown | string;
}
export const main = webhook;
