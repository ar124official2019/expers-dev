import { RequirementError, RequirementType } from "../requirement";
import { getError } from "./get-error";

describe("geError", () => {
  it("should create an ExpersError", () => {
    const error = getError(
      RequirementType.bodyParam,
      "user",
      RequirementError.type
    );

    expect(error).toBeTruthy();
  });

  it("should create throw an error while creating an ExpersError", () => {
    expect(() => getError(RequirementType.bodyParam, "user", null as any)).toThrow();
  });
});
