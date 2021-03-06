import { ExpersResponse } from "./response";
import { expersHandler } from "./handler";

describe("expersHandler middleware", () => {
  it("Should return 400 error", () => {
    expersHandler(
      ExpersResponse.create(400, "Please give me something...", { body: null }),
      null as any,
      {
        status: (code: number) => {
          expect(code).toBe(400);
          return { json: () => {} };
        },
      } as any,
      () => {}
    );
  });

  it("Should return 500 error", () => {
    expersHandler(
      ExpersResponse.create(432, "Please give me something...", { body: null }),
      null as any,
      {
        status: (code: number) => {
          expect(code).toBe(500);
          return { json: () => {} };
        },
      } as any,
      () => {}
    );
  });
});
