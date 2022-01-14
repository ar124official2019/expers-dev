import { ExpersResponse } from "../response";
import {
  DataType,
  IRequirement,
  RequirementError,
  RequirementType,
} from "../requirement";
import { getError } from "./get-error";

/**
 * Maximum length Validator
 * @param value value to be validated
 * @param requirement requirement object
 * @returns ExpersResponse instance if failed, null otherwise
 */
export function maxLength(
  value: any,
  requirement: IRequirement
): ExpersResponse | null {
  const ml = Number(requirement.maxLength);

  if (
    (requirement.type == RequirementType.header ||
      requirement.dataType == DataType.string ||
      requirement.dataType == DataType.array) &&
    !isNaN(ml) &&
    ml > 0
  ) {
    let val = value;
    if (requirement.dataType == DataType.string) val = (val + "").toString();
    const error = val.length > ml;

    if (error) {
      return getError(
        requirement.type,
        requirement.name,
        RequirementError.maxLength,
        requirement.dataType,
        ml
      );
    }
  }

  return null;
}
