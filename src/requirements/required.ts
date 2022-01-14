import { ExpersResponse } from "../response";
import { DataType, IRequirement, RequirementError } from "../requirement";
import { getError } from "./get-error";

/**
 * Required param Validator
 * @param value value to be validated
 * @param requirement requirement object
 * @returns ExpersResponse instance if failed, null otherwise
 */
export function required(
  value: any,
  requirement: IRequirement
): ExpersResponse | null {
  let errorSet = false;

  switch (requirement.dataType) {
    // case DataType.array:
    // case DataType.string:
    //   errorSet = true;
    //   break;

    case DataType.number:
      if (isNaN(Number(value))) errorSet = true;
      break;

    default:
      errorSet = !!!value;
      break;
  }

  if (errorSet) {
    return getError(
      requirement.type,
      requirement.name,
      RequirementError.required,
      requirement.dataType
    );
  }

  return null;
}
