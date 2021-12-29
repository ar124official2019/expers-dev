import ExpersConfig from "./config";
import * as fs from "fs";
import * as path from "path";

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
