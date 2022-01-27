import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  notFound,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http-helper";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

export class UpdateImpedimentsController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;

      const repository = new ImpedimentRepository();

      const impediments = await repository.editImpediment({ uid, ...req.body });

      if (!impediments) return notFound(res);

      const cache = new CacheRepository();
      await cache.delete(`impediment:${uid}`);
      const result = await cache.set(
        `impediment:${impediments.uid}`,
        impediments
      );

      if (!result) console.log("Nao salvou no cache do Redis");
      await cache.delete("impediments:List");

      return ok(res, impediments);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
