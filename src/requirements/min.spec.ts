import { ExpersResponse } from "../response";
import { DataType } from "../requirement";
import { RequirementType } from "../requirement";
import { min } from "./min";

describe("Validators", () => {
  it("should create min error", () => {
    const error = min(7, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.number,
      min: 9,
    });

    expect(error).toBeInstanceOf(ExpersResponse);
  });

  it("should not create min error", () => {
    const error = min(5, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      min: 5,
    });

    expect(error).toBeNull();
  });
});
