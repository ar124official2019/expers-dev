import path from "path";
import { initExpers } from "./init-expers";
import { expersRequirements } from "./requirements";

describe("requirements", () => {
  initExpers(path.join(__dirname, "requirements.spec"));
  const getUserValidator = expersRequirements("get-user");

  it("should create validatation middleware", () => {
    expect(getUserValidator).toBeTruthy();
  });

  it("should create validation error", () => {
    getUserValidator(
      {
        query: {},
      } as any,
      {
        status: (code: number) => {
          expect(code).toBe(400);

          return { json: () => {} };
        },
      } as any,
      () => {
        throw "It should have already returned the response";
      }
    );
  });

  it("should not create validation error", () => {
    getUserValidator(
      {
        query: {
          id: 5,
        },
      } as any,
      {
        status: (code: number) => {
          throw "It should have passed validations!";
        },
      } as any,
      () => {}
    );
  });
});
