const status = require("statuses");

export interface IExpersResponse {
  statusCode: number;
  errorCode?: string;
  message?: string;
  data?: any;
}

export class ExpersResponse implements IExpersResponse {
  statusCode: number;
  errorCode: string;
  message?: string;
  data: any;

  /**
   * Please Do Not use constructor direcly, rather use `create` and `from` methods to safely create an object
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
   */
  static from(errorObject: IExpersResponse) {
    return ExpersResponse.create(
      errorObject.statusCode,
      errorObject.message,
      errorObject.data
    );
  }

  /**
   * Create a new Internal Server Error from given ExpersError's **LIKE** object
   * Use this method to create a new status safely (instead of constructor)
   */
  static serverError() {
    return new ExpersResponse(500, "Internal server error!", null);
  }
}