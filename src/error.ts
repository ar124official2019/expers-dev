const status = require("statuses");

export interface IExpersError {
  statusCode: number;
  errorCode?: string;
  errorMessage: string;
  data?: any;
}

export class ExpersError {
  statusCode: number;
  errorCode: string;
  errorMessage: string;
  data: any;

  /**
   * Please Do Not use constructor direcly, rather use `create` and `from` methods to safely create an object
   */
  constructor(statusCode: number, errorMessage: string, data: any = null) {
    // assert that status is a valid HTTP Status Code
    this.statusCode = statusCode;
    this.errorCode = status(statusCode);
    this.errorMessage = errorMessage;
    this.data = data;
  }

  /**
   * Create a new error
   * Use this method to create a new status safely (instead of constructor)
   */
  static create(statusCode: number, errorMessage: string, data: any = null) {
    try {
      return new ExpersError(statusCode, errorMessage, data);
    } catch (err) {
      return ExpersError.serverError();
    }
  }

  /**
   * Create a new error from given ExpersError's **LIKE** object
   * Use this method to create a new status safely (instead of constructor)
   */
  static from(errorObject: IExpersError) {
    return ExpersError.create(
      errorObject.statusCode,
      errorObject.errorMessage,
      errorObject.data
    );
  }

  /**
   * Create a new Internal Server Error from given ExpersError's **LIKE** object
   * Use this method to create a new status safely (instead of constructor)
   */
  static serverError() {
    return new ExpersError(500, "Internal server error!", null);
  }
}
