import { ExpersError } from "./../error";
import { DataType } from "./../requirement";
import { RequirementType } from "../requirement";
import { maxLength } from "./max-length";

describe("Validators", () => {
  it("should create max length error", () => {
    const error = maxLength("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
      maxLength: 3,
    });

    expect(error).toBeInstanceOf(ExpersError);
  });

  it("should create max length error", () => {
    const error = maxLength(["okay", "bad"], {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      maxLength: 1,
    });

    expect(error).toBeInstanceOf(ExpersError);
  });

  it("should not create max error", () => {
    const error = maxLength("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
      maxLength: 5,
    });

    expect(error).toBeNull();
  });

  it("should not create max error", () => {
    const error = maxLength(["okay", "bad"], {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      maxLength: 2,
    });

    expect(error).toBeNull();
  });
});
