import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const webhook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log("====================================");
  console.log(event);
  console.log("====================================");
  return formatJSONResponse._400({ message: "hi" });
};

export const main = middyfy(webhook);

// interface ApiResponses {
//   data?: object;
//   error?: object;
// }
