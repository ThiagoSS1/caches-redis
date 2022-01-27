import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";
import { Impediments } from "../../domain/models/impediments";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import {
  notFound,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http-helper";
export class GetOneImpedimentsController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;

      // cria uma instância do repositorio que cuida do cache
      const cache = new CacheRepository();

      // recupera o registro no cache
      const ImpedimentsCache: Impediments = await cache.get(
        `impediment:${uid}`
      );

      // verifica se encontrou e retorna caso verdadeiro
      if (ImpedimentsCache) {
        return ok(res, ImpedimentsCache);
      }

      // se não encontrou no cache é buscado na base dados
      const repository = new ImpedimentRepository();
      const impediment = await repository.getByUid(uid);

      if (!impediment) return notFound(res);

      // salva no redis para o dado ficar cacheado
      await cache.set(`impediment:${impediment.uid}`, impediment);

      return ok(res, impediment);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
