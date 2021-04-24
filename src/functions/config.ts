"use strict";

const mongoClusterName = "devcamper";
const mongoUser = "abbeyseto";
const mongoDbName = "email-tracker";
const mongoPass = "ologinahtti1";

module.exports = {
  awsAccountId: "545690362383",
  awsAccessKey: "AKIAX6DNOEIHVOKRPZ5J",
  awsSecretKey: "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",
  MONGO_DB_URL: `mongodb+srv://${mongoUser}:${mongoPass}@${mongoClusterName}.xaaoc.mongodb.net/${mongoDbName}?retryWrites=true`,
};
