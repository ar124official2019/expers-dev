import { DataType, IRequirement, RequirementError } from "./../requirement";
import { getError } from "./get-error";

export function min(value: any, requirement: IRequirement) {
  const m = Number(requirement.min);

  if (requirement.dataType == DataType.number && !isNaN(m)) {
    const error = value < m;

    if (error) {
      return getError(
        requirement.type,
        requirement.name,
        RequirementError.min,
        requirement.dataType,
        m
      );
    }
  }

  return null;
}
