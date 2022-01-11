import { DataType, IRequirement, RequirementError, RequirementType } from "./../requirement";
import { getError } from "./get-error";

export function type(value: any, requirement: IRequirement) {
  let error = false;

  if (requirement.dataType == DataType.boolean) {
    error = !value && value !== false;
  } else if (requirement.dataType == DataType.number) {
    error = isNaN(Number(value));
  } else if (requirement.dataType == DataType.string) {
    error = !(value + "" == value) || Array.isArray(value);
  } else if (requirement.dataType == DataType.array) {
    let val = value;

    if (requirement.type == RequirementType.queryParam || requirement.type == RequirementType.header) {
      try {
        val = JSON.parse(value);
      } catch {
        val = null;
      }
    }

    error = !Array.isArray(val);
  }

  if (error) {
    return getError(
      requirement.type,
      requirement.name,
      RequirementError.type,
      requirement.dataType
    );
  }

  return null;
}
