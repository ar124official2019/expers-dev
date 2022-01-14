import { ExpersResponse } from "./response";

describe("ExpersError class", () => {
  it("Should create an instance", () => {
    expect(new ExpersResponse(500, "")).toBeInstanceOf(ExpersResponse);
  });

  it("Should create a safe instance", () => {
    expect(
      ExpersResponse.create(400, "Please give me something...", { body: null })
    ).toBeInstanceOf(ExpersResponse);
  });

  it("Should create a safe instance", () => {
    expect(
      ExpersResponse.create(1, "Please give me something...", { body: null })
    ).toBeInstanceOf(ExpersResponse);
  });

  it("Should not create an instance", () => {
    expect(() => {
      return new ExpersResponse(1, "Please give me something...", { body: null });
    }).toThrow();
  });
});
