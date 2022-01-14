import { ExpersResponse } from "../response";
import { DataType } from "../requirement";
import { RequirementType } from "../requirement";
import { type } from "./type";

describe("Validators", () => {
  it("should create type error", () => {
    const error = type(["okay"], {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
    });

    expect(error).toBeInstanceOf(ExpersResponse);
  });

  it("should create type error", () => {
    const error = type("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.number,
    });

    expect(error).toBeInstanceOf(ExpersResponse);
  });

  it("should not create type error", () => {
    const error = type("50", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.number,
    });

    expect(error).toBeNull();
  });

  it("should not create type error", () => {
    const error = type(50, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.string,
    });

    expect(error).toBeNull();
  });

  it("should not create type error", () => {
    const error = type("true" + "false", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.boolean,
    });

    expect(error).toBeNull();
  });

  it("should not create type error", () => {
    const error = type(false, {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.boolean,
    });

    expect(error).toBeNull();
  });

  it("should not create type error", () => {
    const error = type("okay", {
      type: RequirementType.bodyParam,
      name: "enum",
      dataType: DataType.boolean,
    });

    expect(error).toBeNull();
  });
});
