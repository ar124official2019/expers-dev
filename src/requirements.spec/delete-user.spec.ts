import { initExpers } from "../init-expers";
import { expersRequirements } from "../requirement";

describe("delete-user", () => {
  initExpers(__dirname);
  const deleteUserValidator = expersRequirements("delete-user");

  it("should delete validatation middleware", () => {
    expect(deleteUserValidator).toBeTruthy();
  });

  it("should delete validation error", () => {
      deleteUserValidator(
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

  it("should not delete validation error", () => {
    const query = {
      _id: "61d0bc1815201ea11b09252a",
    };

    deleteUserValidator(
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
