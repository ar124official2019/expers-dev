import * as expers from "./index";

describe("expers", () => {
  it("should test module exports", () => {
    const exp = expers as any;
    for (let prop in exp) expect(exp[prop]).toBeTruthy();
  });
});
