import { ExpersError } from "./error";

describe("ExpersError class", () => {
  it("Should create an instance", () => {
    expect(new ExpersError(500, "")).toBeInstanceOf(ExpersError);
  });

  it("Should create a safe instance", () => {
    expect(
      ExpersError.create(400, "Please give me something...", { body: null })
    ).toBeInstanceOf(ExpersError);
  });

  it("Should create a safe instance", () => {
    expect(
      ExpersError.create(1, "Please give me something...", { body: null })
    ).toBeInstanceOf(ExpersError);
  });

  it("Should not create an instance", () => {
    expect(() => {
      return new ExpersError(1, "Please give me something...", { body: null });
    }).toThrow();
  });
});
