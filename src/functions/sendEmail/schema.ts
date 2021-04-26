/**
 * Schema for object passed into the sendEmail lambda as events
 * @additionalProperties value ensures that no other field is allowed to pass
 */

export default {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "array" },
    subject: { type: "string" },
    html: { type: "string" },
  },
  required: ["from", "to", "html"],
  additionalProperties: false,
} as const;
