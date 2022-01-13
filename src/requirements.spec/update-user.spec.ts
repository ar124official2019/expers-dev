import { initExpers } from "../init-expers";
import { expersRequirements } from "../requirements";

describe("update-user", () => {
  initExpers(__dirname);
  const updateUserValidator = expersRequirements("update-user");

  it("should update validatation middleware", () => {
    expect(updateUserValidator).toBeTruthy();
  });

  it("should update validation error", () => {
      updateUserValidator(
        {
          body: {},
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

  it("should not update validation error", () => {
    const body = {
      _id: "61d0bc1815201ea11b09252a",
    };

    updateUserValidator(
      {
        body,
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
