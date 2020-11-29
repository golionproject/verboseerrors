import { NextFunction, Request, Response } from "express";
import isVerboseError from "./isVerboseError";

function verboseErrors(
  error: Error,
  // @ts-ignore
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isVerboseError(error)) {
    if (process.env.NODE_ENV === "development" && process.env.VERBOSE_ERRORS_LOG !== "false")
      console.log({
        where: error.where,
        messages: error.messages,
        code: error.code,
      });
    res
      .status(error.status)
      .send({ where: error.where, messages: error.messages, code: error.code })
      .end();
  } else next(error);
}

export default verboseErrors;