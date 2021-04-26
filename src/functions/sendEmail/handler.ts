import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const { getMailgunAPIKey, getMailgunDomain } = require("../keyStoreModule");

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const sendEmail: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  //Get API key and Domain for mailgun stored using parameter store
  const apiKey = await getMailgunAPIKey();
  const apiDomain = await getMailgunDomain();

  console.log(apiKey, apiDomain);

  // Initialize mailgun Client
  const mg = mailgun.client({
    username: "api",
    key: apiKey,
  });
  const domain = apiDomain;

  // Send Email using mailgun client
  return mg.messages
    .create(domain, event.body)
    .then((msg) => {
      return formatJSONResponse._200(msg);
    })
    .catch((err) => {
      return formatJSONResponse._400(err);
    });
};

export const main = middyfy(sendEmail);
