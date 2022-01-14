import { Handler, NextFunction, Request, Response } from "express";
import ExpersConfig from "./config";
import { ExpersResponse } from "./response";
import { IRequirement } from "./requirement";
import { validateRequirement } from "./requirements/validate-requirement";

export function expersRequirements(key: string): Handler {
  let error: number;
  let requirements: IRequirement[];

  try {
    const config = ExpersConfig.getConfig();
    if (!config || !config.requirements) throw 1;

    requirements = config.requirements.get(key);
    if (!requirements || !Array.isArray(requirements)) throw 2;
  } catch (err) {
    error = Number(err) || 1; // make sure `error` be truthy
  }

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // ignore requirements
      if (error || !requirements || !requirements.length) throw 1;

      // ignore invalid requirement
      requirements = requirements.filter(
        (i) => i && (i.type || i.enum) && i.name
      );

      for (const requirement of requirements) {
        try {
          throw validateRequirement(requirement, req);
        } catch (err) {
          if (err instanceof ExpersResponse) throw err;
          // ignore other errors
        }
      }

      return next();
    } catch (err) {
      if (err instanceof ExpersResponse) {
        return res.status(err.statusCode).json(err);
      }

      // ignore other errors
      return next();
    }
  };
}
