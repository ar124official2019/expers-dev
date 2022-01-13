import { initExpers } from "../init-expers";
import { expersRequirements } from "../requirements";

describe("get-user", () => {
  initExpers(__dirname);
  const getUserValidator = expersRequirements("get-user");

  it("should get validatation middleware", () => {
    expect(getUserValidator).toBeTruthy();
  });

  it("should get validation error", () => {
      getUserValidator(
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

  it("should not get validation error", () => {
    const query = {
      id: 7219,
    };

    getUserValidator(
      {
        query,
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
