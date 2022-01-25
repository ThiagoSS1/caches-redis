import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";
import { Impediments } from "../../domain/models/impediments";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";
export class GetOneImpedimentsController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const { uid } = req.params;

            //const cache = new CacheRepository();

            //const ImpedimentsCache: Impediments = await cache.get(`impediments:${uid}`);

            // if (ImpedimentsCache) {
            //     return ok(res, )
            // }

            const repository = new ImpedimentRepository();
            const impediment = await repository.getByUid(uid);

            if(!impediment) return notFound(res)

            return ok(res, impediment)
        } catch (error: any) {
            return serverError(res, error)
        }
    }
}