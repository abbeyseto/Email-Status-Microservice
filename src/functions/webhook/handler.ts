import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const config = require("../config");

// const sns = new AWS.SNS();

const webhook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let request = event.body["event-data"].event;
  console.log(request);

  const payload = {
    Provider: "Mailgun",
    timestamp: new Date(),
    type: request,
  };

  const params: SnsParameter = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:${config.awsAccountId}:emailStatuses`,
  };

  // Create promise and SNS service object
  let publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  return publishTextPromise
    .then(function (data) {
      console.log("MessageID is " + data.MessageId);
      return formatJSONResponse._200({
        id: data.MessageId,
        data: payload,
      });
    })
    .catch(function (err) {
      return formatJSONResponse._400({ message: err.message });
    });
};

// create a resonse

// return formatJSONResponse._400({ message: "hi" });
interface SnsParameter {
  Message: string;
  Subject?: string;
  TopicArn: string;
}
export const main = middyfy(webhook);
