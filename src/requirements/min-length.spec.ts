import { ExpersResponse } from "../response";
import { DataType } from "./../requirement";
import { RequirementType } from "../requirement";
import { minLength } from "./min-length";

describe("Validators", () => {
  it("should create min length error", () => {
    const error = minLength("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
      minLength: 5,
    });

    expect(error).toBeInstanceOf(ExpersResponse);
  });

  it("should create min length error", () => {
    const error = minLength(["okay", "bad"], {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      minLength: 3,
    });

    expect(error).toBeInstanceOf(ExpersResponse);
  });

  it("should not create min error", () => {
    const error = minLength("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
      minLength: 4,
    });

    expect(error).toBeNull();
  });

  it("should not create min error", () => {
    const error = minLength(["okay", "bad"], {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.array,
      minLength: 2,
    });

    expect(error).toBeNull();
  });
});
