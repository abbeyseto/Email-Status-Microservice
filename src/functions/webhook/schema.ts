export default {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "array" },
    subject: { type: "string" },
    html: { type: "string" },
  },
  required: ["from", "to", "html"],
} as const;
