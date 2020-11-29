import VerboseError from "./VerboseError";
import Ajv from "ajv";

function isVerboseError(error: any): error is VerboseError {
  const ajv = new Ajv({
    allErrors: true,
  });
  const isValid = ajv.validate(
    {
      type: "object",
      properties: {
        where: {
          type: "string",
          minLength: 1,
        },
        messages: {
          type: "array",
          items: {
            type: "string",
          },
        },
        code: {
          type: "integer",
          minimum: 1,
        },
        status: {
          type: "integer",
          minimum: 100,
          maximum: 599,
        },
      },
      required: ["where", "messages", "code", "status"],
      additionalProperties: false,
    },
    error
  );
  if (typeof isValid !== "boolean") return false;
  return isValid;
}

export default isVerboseError;