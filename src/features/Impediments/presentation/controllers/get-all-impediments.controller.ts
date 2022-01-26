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

export class GetAllImpedimentsController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      // cria uma instância do repositório do cache
      const cache = new CacheRepository();

      // busca os registro no cache
      const impedimentsCache = await cache.get("impediments");

      // verifica se tem registro, caso verdadeiro, retorna do cache
      if (impedimentsCache) {
        return ok(
          res,
          (impedimentsCache as Impediments[]).map((impediment) => impediment)
        );
      }

      const repository = new ImpedimentRepository();

      const impediments = await repository.getAll();

      if (impediments.length === 0) return notFound(res);

      // salva no redis para servir de cache
      await cache.set("impediments", impediments);

      return ok(res, impediments);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
