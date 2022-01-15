import path from "path";
import ExpersConfig from "./config";
import { initExpers } from "./init-expers";

describe("initExpers", () => {
  it("should initialize `expers`", () => {
    initExpers(path.join(__dirname, "requirements.spec"));
    const config = ExpersConfig.getConfig();
    expect(config.requirements.size).toBe(5);
  });
});
