import { ExpersError } from "./../error";
import { DataType } from "./../requirement";
import { RequirementType } from "../requirement";
import { required } from "./required";

describe("Validators", () => {
  it("should create required error", () => {
    const error = required("", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
    });

    expect(error).toBeInstanceOf(ExpersError);
  });

  it("should create required error", () => {
    const error = required("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.number,
    });

    expect(error).toBeInstanceOf(ExpersError);
  });

  it("should not create required error", () => {
    const error = required(0, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.number,
    });

    expect(error).toBeNull();
  });

  it("should not create required error", () => {
    const error = required("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
    });

    expect(error).toBeNull();
  });
});
