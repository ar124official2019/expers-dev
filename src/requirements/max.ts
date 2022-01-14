import { ExpersResponse } from "../response";
import { DataType, IRequirement, RequirementError } from "../requirement";
import { getError } from "./get-error";

/**
 * Maximum value Validator
 * @param value value to be validated
 * @param requirement requirement object
 * @returns ExpersResponse instance if failed, null otherwise
 */
export function max(
  value: any,
  requirement: IRequirement
): ExpersResponse | null {
  const m = Number(requirement.max);

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
