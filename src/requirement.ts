/**
 * Interface for defining requirements
 */
export interface IRequirement {
  /**
   * Type of the requirement
   */
  type: RequirementType;

  /**
   * Name of the property or requirement
   */
  name: string;

  /**
   * Data type of the requirement
   */
  dataType: DataType;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Minimum length of the value
   */
  minLength?: number;

  /**
   * Maximum length of the value
   */
  maxLength?: number;

  /**
   * Possible values
   */
  enum?: any[];
}

/**
 * Different types of requirements
 */
export enum RequirementType {
  queryParam = "query param",
  bodyParam = "body param",
  header = "header",
}

/**
 * Kind of error found with request
 */
export enum RequirementError {
  required = 1,
  type,
  min,
  max,
  minLength,
  maxLength,
  enum,
}

/**
 * Possible data types
 */
export enum DataType {
  number = "number",
  string = "string",
  boolean = "boolean",
  array = "array",
}
