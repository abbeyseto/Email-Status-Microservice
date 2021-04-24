import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
const MongoClient = require("mongodb").MongoClient;

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const config = require("../config");

const client = new MongoClient(config.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const createConn = async () => {
  await client.connect();
  db = client.db("");
};

/**
 * Validate event body with @schema when calling @webhook controller
 * @param event
 * @returns
 */

const webhook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let { body } = event;
  let type = body["event-data"]?.event || "";
  let timestamp = body.signature.timestamp || "";

  //Data check using interface Payload
  const payload: Payload = {
    Provider: "Mailgun",
    timestamp: timestamp || new Date(),
    type: type || "",
  };

  //Data check using interface SnsParameter
  const params: SnsParameter = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:${config.awsAccountId}:emailStatuses`,
  };

  if (!client.isConnected()) {
    // Cold start or connection timed out. Create new connection.
    try {
      await createConn();
      console.log("DB connected");
    } catch (e) {
      return formatJSONResponse._400({
        message: e.message,
      });
    }
  }
  /**
   * Create promise and SNS service object
   * Handle promise's fulfilled/rejected states and return appopriate response
   */
  let publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  try {
    publishTextPromise.then(function (data) {
      const mailgunEvents = db.collection("mailgun-events");
      mailgunEvents.insertOne(body);
      console.log(JSON.stringify(payload), JSON.stringify(data));
      return formatJSONResponse._200({ message: "SNS published" });
    });
  } catch (err) {
    console.log(err.message);
    return formatJSONResponse._400({
      message: "SNS not published, An error occured",
    });
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
export const main = middyfy(webhook);
