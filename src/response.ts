const status = require("statuses");

// interface for standard response
export interface IExpersResponse {
  statusCode: number;
  errorCode?: string;
  message?: string;
  data?: any;
}

/**
 * A typical REST API response (JSON)
 */
export class ExpersResponse implements IExpersResponse {
  statusCode: number;
  errorCode: string;
  message?: string;
  data: any;

  /**
   * Please **Do NOT** use constructor direcly, rather use `create` and `from` methods to safely create an object.
   *
   * Create a new ExpersResponse (A typical API response)
   */
  constructor(statusCode: number, message: string = "", data: any = null) {
    // assert that status is a valid HTTP Status Code
    this.statusCode = statusCode;
    this.errorCode = status(statusCode);
    this.message = message;
    this.data = data;
  }

  /**
   * Create a new error
   * Use this method to create a new status safely (instead of constructor)
   *
   * @param { Number } statusCode A valid HTTP Status Code,
   * invalid would result in 500 Internal Server Error response instead
   * @param { String } message A message
   */
  static create(statusCode: number, message: string = "", data: any = null) {
    try {
      return new ExpersResponse(statusCode, message, data);
    } catch (err) {
      return ExpersResponse.serverError();
    }
  }

  /**
   * Create a new error from given ExpersError's **LIKE** object
   * Use this method to create a new status safely (instead of constructor)
   *
   * @param { IExpersResponse } errorObject an object of type IExpersResponse, to create ExpersResponse from.
   * Please note that `errorObject` should be truthy,
   * and its property `statusCode` (errObject.statusCode) should be a valid HTTP Status Code,
   * otherwise a 500 Internal Server Error result would be created instead
   */
  static from(errorObject: IExpersResponse) {
    try {
      return ExpersResponse.create(
        errorObject.statusCode,
        errorObject.message,
        errorObject.data
      );
    } catch {
      return ExpersResponse.serverError();
    }
  }

  /**
   * Create a new Internal Server Error from given ExpersError's **LIKE** object
   * Use this method to create a new status safely (instead of constructor)
   */
  static serverError() {
    return new ExpersResponse(500, "Internal server error!", null);
  }
}
