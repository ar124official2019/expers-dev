import path from "path";
import { initExpers } from "./init-expers";
import { expersRequirements } from "./requirements";

describe("requirements", () => {
  initExpers(path.join(__dirname, "requirements.spec"));
  const getUserValidator = expersRequirements("get-user");

  it("should create validatation middleware", () => {
    expect(getUserValidator).toBeTruthy();
  });
});
