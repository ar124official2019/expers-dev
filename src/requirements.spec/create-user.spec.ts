import { initExpers } from "../init-expers";
import { expersRequirements } from "../requirements";

describe("create-user", () => {
  initExpers(__dirname);
  const createUserValidator = expersRequirements("create-user");

  it("should create validatation middleware", () => {
    expect(createUserValidator).toBeTruthy();
  });

  it("should create validation error", () => {
    const requests: any[] = [
      {},
      { name: "Foo bar" },
      { name: "Foo bar", email: "foo@bar.baz" },
      { name: "Foo bar", email: "foo@bar.baz", password: "abcd" },
      {
        name: "Foo bar",
        email: "foo@bar.baz",
        password: "abcdabcd",
        type: "other",
      },
    ];

    for (const body of requests) {
      createUserValidator(
        {
          body,
          get: () => body.password, // get header, check both empty and valid value
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
    }
  });

  it("should not create validation error", () => {
    const body = {
      name: "Foo bar",
      email: "foo@bar.baz",
      password: "abcdefgh",
      type: "regular",
    };

    createUserValidator(
      {
        body,
        get: () => "abcdefghijklmn", // get header
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
