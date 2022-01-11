import { ExpersError } from "./../error";
import { DataType } from "./../requirement";
import { RequirementType } from "../requirement";
import { max } from "./max";

describe("Validators", () => {
  it("should create max error", () => {
    const error = max(10, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.number,
      max: 9,
    });

    expect(error).toBeInstanceOf(ExpersError);
  });

  it("should not create max error", () => {
    const error = max(3, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      max: 5,
    });

    expect(error).toBeNull();
  });
});
