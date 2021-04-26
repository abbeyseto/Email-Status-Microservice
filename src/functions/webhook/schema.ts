/**
 * Schema for object passed into the webhook lambda as events
 * @additionalProperties value ensures that no other field is allowed to pass
 */

export default {
  type: "object",
  properties: {
    "event-data": { type: "object" },
    signature: { type: "object" },
  },
  required: ["event-data", "signature"],
  additionalProperties: false,
} as const;
