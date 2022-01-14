import ExpersConfig from "./config";
import * as fs from "fs";
import * as path from "path";

/**
 * Initializes `expers` module.
 * It should be called in your `ExpressJS` application as soon as possible,
 * most desired before you create an express app object. See example below
 * 
 * @param { String } requirementsDirectoryPath Absoulte (full) Path to the directory where requirement files are placed
 * 
 * @example ```
 * const path = require('path');
 * const expres = require('expers');
 * const express = require('express');
 * 
 * expers(path.join(__dirname, 'requirements'));
 * const app = express();
 * ```
 */
export function initExpers(requirementsDirectoryPath: string) {
  let config = ExpersConfig.getConfig();
  if (!config) config = ExpersConfig.initConfig();

  try {
    const entries = fs.readdirSync(requirementsDirectoryPath, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (entry.isFile() && !entry.isSymbolicLink()) {
        try {
          const name = path.basename(entry.name, ".json");

          config.requirements.set(
            name,
            require(path.join(requirementsDirectoryPath, entry.name))
          );

          ExpersConfig.setConfig(config);
        } catch {
          console.warn("expers:", `skipping file ${entry.name}`);
        }
      }
    }
  } catch {
    console.warn("expers:", `skipping directory ${requirementsDirectoryPath}`);
  }
}
