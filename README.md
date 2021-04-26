# Email Status Service

This project implements a scenario where an email goes out via Mailgun (mailgun.com). Once it’s out, Mailgun sends various events back (open, clicked, etc).

When the email is sent out via Mailgun, these events is sent via webhooks, hitting an API Gateway and then that information is proxied to a Lambda. The Lambda does two things: save a copy of the raw webhook a dabase and publish a transformed version into AWS SNS.

This service was implemented using the [Serverless framework](https://www.serverless.com/).

For additional knowledge using this framework with AWS, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation

Clone this repository on your local machine by usig the `git clone` command

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Dependencies

- Run `npm i` to install the project dependencies

### Configurations

| :warning: WARNING                                                                           |
| :------------------------------------------------------------------------------------------ |
| It is important to change configuration settings before building, packaging and deployment. |

Go to the `src/functions/config.ts` file to change all configuration parameters to deploy to your own environment.

#### Storing Secrets and Keys

For security, this guide will help to store secrets using Parameter Store provided by Systems Manager in AWS.

These keys need to be stored on AWS as the Lambda functions will need them to run.

To store a key, make sure you are authenticated via the AWS CLI and run the following command:

```bash
aws ssm put-parameter --name NAME_OF_SECRET \
                      --value 'my super safe secret' \
                      --type SecureString
```

Below are the keys needed for to run these lambda functions:

awsAccountId="xxxxxxxxxxx",
MAILGUN_API_KEY="XXXXXXXXXXXXXXX",
MAILGUN_DOMAIN="mailgun.XXXXXXXX.com"

## Deployment

- Log in to AWS CLI from your teminal by
- Run `npx sls package --package dist ` to build from typescript to javascript files and package it in to the dist folder with cloudformation configuration files
- Run `npx sls deploy --package dist` to deploy this stack to AWS

> **Alternatively**: You can also install the serverless package globally by runing `npm install -g serverless`

> and then, run the `npm run build-deploy` command to both build and deploy to AWS

## Testing the service

### Remotely

Two API endpoint will be generated after deployment. they should be in the format

- https://ApiEndpoint/dev/sendEmail - This is the endpoint for sending email.

This accepts a POST request and a payload in the following format:

```bash
{
    "to": ["abc@xyz.com"],
    "from": "you@mailgun-email.com", # Sender's email from your mailgun account
    "subject": "Email Service"
    "html":"This is a test email from email service" #Body of the email
}
```

> Content-Type: application/json

This can be tested from postman

- https://ApiEndpoint/dev/webhook - This webhook should be configured on your mailgun account to send events (e.g opened, delivered, click e.t.c)

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/sendEmail' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to": ["abc@xyz.com"],
    "from": "you@mailgun-email.com",
    "subject": "Email Service"
    "html":"This is a test email from email service"
}'
```

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda.

## Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for the lambda functions
- `libs` - containing shared code base between lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── sendEmail
│   │   │   ├── handler.ts      # `sendEmail` lambda source code
│   │   │   ├── index.ts        # `sendEmail` lambda Serverless configuration
│   │   │   ├── mock.json       # `sendEmail` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `sendEmail` lambda input event JSON-Schema
│   │   ├── webhook
│   │   │   ├── handler.ts      # `webhook` lambda source code
│   │   │   ├── index.ts        # `webhook` lambda Serverless configuration
│   │   │   ├── mock.json       # `webhook` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `webhook` lambda input event JSON-Schema
│   │   │
│   │   ├── config.ts           # configurations abstactions. Change these parameters to your own
│   │   ├── db.ts               # mongodb database connection abstactions.
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`

## Author

Adenle Abiodun
