import { ErrorRequestHandler, Handler, Request, Response } from "express";
import { ExpersResponse } from "./response";
const status = require("statuses");

/**
 * Express error middleware.
 * It should be set after creating API routes,
 * or integrating routers to catch and respond with errors.
 * See example below.
 * 
 * @example
 * ```
 * const { expersNotFound, expersHandler } = require('expers');
 * 
 * // basic usage
 * // your routes here like app.use(x), app.use(y), app.get(z)...
 * app.use(expersNotFound); // catches rest of the routes and sends back 404
 * 
 * // ideal usage - use with expersHandler in one line
 * app.use(expersNotFound, expersHandler);
 * ```
 */
export const notFoundHandler: Handler = (req: Request, res: Response) => {
  if (!!req && !!res) {
  }

  const error = ExpersResponse.notFound();
  return res.status(error.statusCode).json(error);
};

/**
 * Express error middleware.
 * It should be set after creating API routes,
 * or integrating routers to catch and respond with errors.
 */
export const expersHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!!req && !!next) {
  }

  // Handle 404
  if (!err) {
    err = ExpersResponse.notFound();
  }

  try {
    if (
      !(err instanceof ExpersResponse) ||
      isNaN(err.statusCode) ||
      !status(err.statusCode)
    )
      throw err;
  } catch {
    error = ExpersResponse.serverError();
  }

  return res.status(error.statusCode).json(error);
};
