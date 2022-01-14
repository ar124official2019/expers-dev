import { ExpersResponse } from '../response';
import { DataType, RequirementType } from "../requirement";
import { validateRequirement } from "./validate-requirement";

describe("validateRequirements", () => {
  it("should create validation errors", () => {
    expect(
      validateRequirement(
        {
          type: RequirementType.bodyParam,
          name: "id",
          dataType: DataType.number,
        },
        {} as any
      )
    ).toBeInstanceOf(ExpersResponse);
  });

  it("should not create validation errors", () => {
    expect(
      validateRequirement(
        {
          type: RequirementType.queryParam,
          name: "id",
          dataType: DataType.number,
        },
        {
          query: { id: 5 },
        } as any
      )
    ).toBeFalsy();
  });
});
