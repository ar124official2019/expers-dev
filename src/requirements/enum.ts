import { ExpersResponse } from "./../response";
import { IRequirement, RequirementError } from "./../requirement";
import { getError } from "./get-error";

/**
 * ENUM Validator
 * @param value value to be validated
 * @param requirement requirement object
 * @returns ExpersResponse instance if failed, null otherwise
 */
export function enums(
  value: any,
  requirement: IRequirement
): ExpersResponse | null {
  let error;

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

  return null;
}
