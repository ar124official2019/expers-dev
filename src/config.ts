import { configName } from "./name";

export interface ExpersProcess extends NodeJS.Process {
  "expers-config": IExpersConfig;
}

export interface IExpersConfig {
  requirements: Map<string, any>;
}

export default class ExpersConfig {
  /**
   * intialize Expers config
   * @returns
   */
  static initConfig(): IExpersConfig {
    Object.defineProperty(process, configName, {
      value: {
        requirements: new Map(),
      },
    });

    return ExpersConfig.getConfig();
  }

  /**
   * get Expers config
   */
  static getConfig(): IExpersConfig {
    return (
      ((process as ExpersProcess)[configName] as IExpersConfig) || {
        requirements: new Map(),
      }
    );
  }

  static setConfig(config: IExpersConfig) {
    (process as ExpersProcess)[configName] = config;
  }
}
