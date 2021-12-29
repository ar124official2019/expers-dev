import { Request } from "express";

import { IRequirement, RequirementType } from "../requirement";
import { enums } from "./enum";
import { max } from "./max";
import { maxLength } from "./max-length";
import { min } from "./min";
import { minLength } from "./min-length";
import { required } from "./required";
import { type } from "./type";

export function validateRequirement(requirement: IRequirement, req: Request) {
  let error;
  let value = undefined;

  /**
   * Extract value
   */
  switch (requirement.type) {
    case RequirementType.bodyParam:
      value = req.body[requirement.name];
      break;

    case RequirementType.queryParam:
      value = req.query[requirement.name];
      break;

    case RequirementType.header:
      value = req.get(requirement.name);
      break;

    default:
      requirement.type = RequirementType.bodyParam;
      value = req.body[requirement.name];
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
  ]

  for (const validation of validations) {
    if (!!validation.condidtion) {
      const result = validation.func(value, requirement);
      if (result) return result;
    }
  }

  return null;
}
