export default {
  type: "object",
  properties: {
    "event-data": { type: "object" },
    recipient: { type: "string" },
    id: { type: "string" },
  },
  required: ["event-data"],
} as const;
