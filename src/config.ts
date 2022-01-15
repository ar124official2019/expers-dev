import { configName } from "./name";

/**
 * NodeJS process
 */
export interface ExpersProcess extends NodeJS.Process {
  "expers-config": IExpersConfig;
}

/**
 * Type for module configuration
 */
export interface IExpersConfig {
  /**
   * A map of requirements (objects)
   */
  requirements: Map<string, any>;
}

/**
 * Class responsible for module configuration
 */
export default class ExpersConfig {
  /**
   * intialize Expers config
   * @returns { IExpersConfig } newly defined config
   */
  static initConfig(): IExpersConfig {
    Object.defineProperty(process, configName, {
      value: {
        requirements: new Map(),
      },

      writable: true,
    });

    return ExpersConfig.getConfig();
  }

  /**
   * get Expers config
   * @returns { IExpersConfig } Existing config or a new (UN-SAVED) config
   */
  static getConfig(): IExpersConfig {
    return (
      ((process as ExpersProcess)[configName] as IExpersConfig) || {
        requirements: new Map(),
      }
    );
  }

  /**
   * set Expers config
   */
  static setConfig(config: IExpersConfig) {
    (process as ExpersProcess)[configName] = config;
  }
}
