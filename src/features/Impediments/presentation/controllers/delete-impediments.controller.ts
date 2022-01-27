import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  notFound,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http-helper";
import { Impediments } from "../../domain/models/impediments";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";

export class DeleteImpedimentsController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;

      const cache = new CacheRepository();

      const repository = new ImpedimentRepository();
      const impediment = await repository.destroy(uid);

      if (!impediment) return notFound(res);

      await cache.delete(`impediments:List`);
      await cache.delete(`impediment:${uid}`);

      return ok(res, impediment);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
