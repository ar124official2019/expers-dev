import { ErrorRequestHandler } from "express";
import { ExpersError } from "./error";
const status = require("statuses");

export const expersHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!!req && !!next) {
  }

  let error = err;

  try {
    if (
      !(err instanceof ExpersError) ||
      isNaN(err.statusCode) ||
      !status(err.statusCode)
    ) throw err;
  } catch {
    error = ExpersError.serverError();
  }

  return res.status(error.statusCode).json(error);
};
