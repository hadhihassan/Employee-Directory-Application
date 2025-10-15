import type { ZodSchema } from "zod";
import { GraphQLError } from "graphql";

export const formatError = (code: string, message: string) => {
    return new GraphQLError(message, {
        extensions: {
            code,
            timestamp: new Date().toISOString(),
        },
    });
};

export const validateInput = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const messages = parsed.error.flatten().fieldErrors;
    const allMessages = Object.values(messages)
      .flat()
      .filter(Boolean)
      .join(", ");
      
    throw formatError("ValidationError", allMessages);
  }
  return parsed.data;
};