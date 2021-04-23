import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key:
    process.env.MAILGUN_API_KEY ||
    "eac12ebb4c5e4e8d23e8dd07df69e788-0d2e38f7-5cbc535f",
});
const domain = process.env.MAILGUN_DOMAIN || "mailgun.senergyeglobal.com";
const sendEmail: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return mg.messages
    .create(domain, event.body)
    .then((msg) => {
      return formatJSONResponse._200(msg);
    }) // logs response data
    .catch((err) => {
      return formatJSONResponse._400(err);
    });
};

export const main = middyfy(sendEmail);

// interface ApiResponses {
//   data?: object;
//   error?: object;
// }
