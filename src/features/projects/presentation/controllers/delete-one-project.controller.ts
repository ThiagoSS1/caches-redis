import { Request, Response } from "express-serve-static-core";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  notFound,
  serverError,
  ok,
} from "../../../../core/presentation/helpers/http-helper";
import { ProjectRepository } from "../../infra/repositories/project.repository";

export class DestroyProjectController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;

      const repository = new ProjectRepository();

      const project = await repository.destroy(uid);

      if (!project) return notFound(res);

      return ok(res, project);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}