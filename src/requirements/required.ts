import { DataType, IRequirement, RequirementError } from "./../requirement";
import { getError } from "./get-error";

export function required(value: any, requirement: IRequirement) {
  let errorSet = false;

  switch (requirement.dataType) {
    // case DataType.array:
    // case DataType.string:
    //   errorSet = true;
    //   break;

    case DataType.number:
      if (isNaN(Number(value)) || value !== 0) errorSet = true;
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
