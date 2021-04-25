import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
// import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

//import db connection
// const { connectToDatabase } = require("../db");

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const config = require("../config");

/**
 * Validate event body with @schema when calling @webhook controller
 * @param event
 * @returns
 */

const webhook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
  context
) => {
  var sns = new AWS.SNS();
  const body = event.body;
  //validate payload with interface typing
  const payload: Payload = {
    Provider: "Mailgun",
    timestamp: body.signature.timestamp,
    type: "email delivered",
  };

  // Validate SNS parameter to be sent using interface typing
  const params: SnsParameter = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:${config.awsAccountId}:emailStatuses`,
  };

  // let response = {
  //   statusCode: 200,
  //   body: JSON.stringify("Hello from Lambda!"),
  //   messageId: "",
  //   result: "",
  // };

  /**
   * Publish SNS message
   */
  sns.publish(params, function (err, data) {
    if (err) {
      console.log(err.stack);
      return;
    }
    console.log("push sent");
    console.log(data);
    context.done(null, "Function Finished!");
  });
  return null;
};
// Get a MongoClient.
// const client = await connectToDatabase();
// Inserts incoming webhook event to database
// const mailgunEvents = client.db().collection("mailgun-events");
// mailgunEvents.insertOne(body);
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
export const main = middyfy(webhook);
