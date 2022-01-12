import {
  DataType,
  IRequirement,
  RequirementError,
  RequirementType,
} from "./../requirement";
import { getError } from "./get-error";

export function enums(value: any, requirement: IRequirement) {
  let error;

  // if (requirement.dataType == DataType.array) {
    error = !requirement.enum?.includes(value);
    if (error) {
      return getError(
        requirement.type,
        requirement.name,
        RequirementError.enum,
        requirement.dataType,
        requirement.enum
      );
    }
  // }

  return null;
}
