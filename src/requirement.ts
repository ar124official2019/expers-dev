import { Handler, NextFunction, Request, Response } from "express";
import ExpersConfig from "./config";
import { ExpersResponse } from "./response";
import { validateRequirement } from "./requirements/validate-requirement";

/**
 * Interface for defining requirements
 */
export interface IRequirement {
  /**
   * Type of the requirement
   */
  type: RequirementType;

  /**
   * Name of the property or requirement
   */
  name: string;

  /**
   * Data type of the requirement
   */
  dataType: DataType;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Minimum length of the value
   */
  minLength?: number;

  /**
   * Maximum length of the value
   */
  maxLength?: number;

  /**
   * Possible values
   */
  enum?: any[];
}

/**
 * Different types of requirements
 */
export enum RequirementType {
  queryParam = "query param",
  bodyParam = "body param",
  header = "header",
}

/**
 * Kind of error found with request
 */
export enum RequirementError {
  required = 1,
  type,
  min,
  max,
  minLength,
  maxLength,
  enum,
}

/**
 * Possible data types
 */
export enum DataType {
  number = "number",
  string = "string",
  boolean = "boolean",
  array = "array",
}

/**
 * Get requirement validation middleware for a particular route.
 * It should be added to handler list of the routes.
 * Desired position would be *A*fter *parser* middlewares and *B*efore your handler function.
 * See usage below to see how to use it properly.
 * @param key unique key of the requirement,
 * should correspond to the name of the file contaiting requirement defination for this route,
 * @returns { Handler } A middleware that automatically checkes the request and validate requirements
 *
 * @example
 * ```
 * // Suppose we've a requirement defination file existing as `create-user.json` with following content
 * `
 * [
 *  {
 *    "type": "body param",
 *    "name": "fullName",
 *    "dataType": "string",
 *    "minLength": 2
 *  }
 * ]
 * `
 *
 * const { expersRequirements } = require('expers');
 * app.post('/user', express.json(), expersRequirements('create-user'), async (req, res, next) => {
 *  // You can now safely access `body` and it's `fullName`
 *  console.log(body.fullName); // should be a valid string with a length of at least 2 character
 *  // ... Your logic
 * });
 * ```
 */
export function expersRequirements(key: string): Handler {
  let error: number;
  let requirements: IRequirement[];

  try {
    const config = ExpersConfig.getConfig();
    if (!config || !config.requirements) throw 1;

    requirements = config.requirements.get(key);
    if (!requirements || !Array.isArray(requirements)) throw 2;
  } catch (err) {
    error = Number(err) || 1; // make sure `error` be truthy
  }

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // ignore requirements
      if (error || !requirements || !requirements.length) throw 1;

      // ignore invalid requirement
      requirements = requirements.filter(
        (i) => i && (i.type || i.enum) && i.name
      );

      for (const requirement of requirements) {
        try {
          throw validateRequirement(requirement, req);
        } catch (err) {
          if (err instanceof ExpersResponse) throw err;
          // ignore other errors
        }
      }

      return next();
    } catch (err) {
      if (err instanceof ExpersResponse) {
        return res.status(err.statusCode).json(err);
      }

      // ignore other errors
      return next();
    }
  };
}
