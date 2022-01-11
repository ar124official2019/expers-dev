import ExpersConfig from "./config";

describe("ExpersConfig", () => {
  it("Should return config", () => {
    expect(ExpersConfig.getConfig()).toBeTruthy();
  });

  it("Should return config", () => {
    expect(ExpersConfig.initConfig()).toBeTruthy();
  });

  it("Should set new config", () => {
    const config = ExpersConfig.getConfig();
    let next;

    config.requirements.set('good', 16);
    ExpersConfig.setConfig(config);

    next = ExpersConfig.getConfig();
    expect(next.requirements.size).toBe(1);
    expect(next.requirements.get('good')).toBe(16);

    config.requirements.set('bad', 20);
    ExpersConfig.setConfig(config);

    next = ExpersConfig.getConfig();
    expect(next.requirements.get('bad')).toBe(20);
  });
});
