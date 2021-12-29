import { DataType, IRequirement, RequirementError } from "./../requirement";
import { getError } from "./get-error";

export function max(value: any, requirement: IRequirement) {
  const m = Number(requirement.min);

  if (requirement.dataType == DataType.number && !isNaN(m)) {
    const error = value > m;

    if (error) {
      return getError(
        requirement.type,
        requirement.name,
        RequirementError.max,
        requirement.dataType,
        m
      );
    }
  }

  return null;
}
