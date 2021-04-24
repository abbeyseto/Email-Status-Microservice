export default {
  type: "object",
  properties: {
    "event-data": { type: "object" },
    signature: { type: "object" },
  },
  required: ["event-data", "signature"],
  additionalProperties: false,
} as const;
