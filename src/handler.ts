import { ErrorRequestHandler } from "express";
import { ExpersResponse } from "./response";
const status = require("statuses");

export const expersHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!!req && !!next) {
  }

  let error = err;

  try {
    if (
      !(err instanceof ExpersResponse) ||
      isNaN(err.statusCode) ||
      !status(err.statusCode)
    ) throw err;
  } catch {
    error = ExpersResponse.serverError();
  }

  return res.status(error.statusCode).json(error);
};
