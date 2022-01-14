import { ExpersResponse } from "../response";
import { Request } from "express";

import { IRequirement, RequirementType } from "../requirement";
import { enums } from "./enum";
import { max } from "./max";
import { maxLength } from "./max-length";
import { min } from "./min";
import { minLength } from "./min-length";
import { required } from "./required";
import { type } from "./type";

/**
 * Validate given requirements on the given request
 * @param requirement requirement object
 * @param req ExpressJS request object
 * @returns null if everything okay, ExpersResponse object otherwise
 */
export function validateRequirement(
  requirement: IRequirement,
  req: Request
): ExpersResponse | null {
  let value = undefined;

  /**
   * Extract value
   */
  switch (requirement.type) {
    case RequirementType.queryParam:
      const query: any = req.query || {};
      value = query[requirement.name];
      break;

    case RequirementType.header:
      const get = req.get || ((_) => null);
      value = get(requirement.name);
      break;

    default:
      const body: any = req.body || {};
      value = body[requirement.name];
      break;
  }

  const validations = [
    { func: required, condidtion: true },
    { func: type, condidtion: requirement.dataType },
    { func: min, condidtion: requirement.min },
    { func: max, condidtion: requirement.max },
    { func: minLength, condidtion: requirement.minLength },
    { func: maxLength, condidtion: requirement.maxLength },
    { func: enums, condidtion: requirement.enum },
  ];

  for (const validation of validations) {
    if (!!validation.condidtion) {
      const result = validation.func(value, requirement);
      if (result) return result;
    }
  }

  return null;
}
