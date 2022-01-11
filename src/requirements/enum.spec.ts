import { DataType } from "./../requirement";
import { RequirementType } from "../requirement";
import { enums } from "./enum";

describe("Validators", () => {
  it("should create enum error", () => {
    const error = enums("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
    });

    expect(error).toBeTruthy();
  });

  it("should not create enum error", () => {
    const error = enums("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      enum: ["bad", "okay"]
    });

    expect(error).toBeNull();
  });
});
