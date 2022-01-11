export interface IRequirement {
  type: RequirementType;
  name: string;
  dataType: DataType;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  enum?: any[];
}

export enum RequirementType {
  queryParam = "query param",
  bodyParam = "body param",
  header = "header",
}

export enum RequirementError {
  required = 1,
  type,
  min,
  max,
  minLength,
  maxLength,
  enum,
}

export enum DataType {
  number = "number",
  string = "string",
  boolean = "boolean",
  array = "array",
}
