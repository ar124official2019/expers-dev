import {
  DataType,
  IRequirement,
  RequirementError,
  RequirementType,
} from "./../requirement";
import { getError } from "./get-error";

export function enums(value: any, requirement: IRequirement) {
  let val, error;

  if (requirement.dataType == DataType.array) {
    if (
      requirement.type == RequirementType.queryParam ||
      requirement.type == RequirementType.header
    ) {
      try {
        val = JSON.parse(value);
      } catch {
        error = true;
      }
    } else if (Array.isArray(value)) {
      val = value;
    }

    if (!error) error = !Array.isArray(val);

    if (error) {
      return getError(
        requirement.type,
        requirement.name,
        RequirementError.maxLength,
        requirement.dataType,
        value
      );
    }
  }

  return null;
}
