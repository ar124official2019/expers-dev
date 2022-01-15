import { ExpersResponse } from "../response";
import { RequirementType, RequirementError, DataType } from "../requirement";

/**
 * Get error, based on given context
 *
 * @param requirementType Type of the requirement
 * @param name Name of the requirement
 * @param errorType Type of the error occured
 * @param dataType name of the required data type
 * @param attributeValue value expected
 */
export function getError(
  requirementType: RequirementType,
  name: string,
  errorType: RequirementError,
  dataType: DataType = DataType.string,
  attributeValue: any = null
): ExpersResponse | null {
  let message = `${requirementType} '${name}' `;

  switch (errorType) {
    case RequirementError.required:
      message += "is required!";
      break;

    case RequirementError.type:
      message += `must be a/an ${dataType}!`;
      break;

    case RequirementError.min:
      if (dataType != DataType.number) return null;
      message += `cannot be less than ${attributeValue}!`;
      break;

    case RequirementError.max:
      if (dataType != DataType.number) return null;
      message += `cannot be more than ${attributeValue}!`;
      break;

    case RequirementError.minLength:
      if (dataType == DataType.string)
        message += `must contain at-least ${attributeValue} characters!`;
      else if (dataType == DataType.array)
        message += `must contain at-least ${attributeValue} item!`;
      else return null;

      break;

    case RequirementError.maxLength:
      if (dataType == DataType.string)
        message += `must contain at-most ${attributeValue} characters!`;
      else if (dataType == DataType.array)
        message += `must contain at-most ${attributeValue} item!`;
      else return null;

      break;

    case RequirementError.enum:
      message += `element must be one of ${JSON.stringify(attributeValue)}!`;
      break;

    default:
      throw new Error(`No such requirement error: ${errorType}`);
  }

  return ExpersResponse.create(400, message, null);
}
