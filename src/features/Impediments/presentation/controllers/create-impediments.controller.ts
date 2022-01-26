import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http-helper";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";

export class CreateImpedimentsController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new ImpedimentRepository();

      const cache = new CacheRepository();

      const impediments = await repository.create(req.body);

      const result = await cache.set(
        `Impediments: ${impediments.uid}`,
        impediments
      );

      if (!result) console.log("Nao salvou no cache do Redis");

      await cache.delete("projects");

      return ok(res, impediments);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
