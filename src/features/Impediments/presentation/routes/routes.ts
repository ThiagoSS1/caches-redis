import { Router } from "express";
import { CreateImpedimentsController } from "../controllers/create-impediments.controller";
import { DeleteImpedimentsController } from "../controllers/delete-impediments.controller";
import { UpdateImpedimentsController } from "../controllers/update-impediments.controller";
import { GetOneImpedimentsController } from "../controllers/get-one-impediments.controller";
import { GetAllImpedimentsController } from "../controllers/get-all-impediments.controller";

export default class ImpedimentsRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/impediments", new CreateImpedimentsController().handle);
    routes.delete(
      "/impediments/:uid",
      new DeleteImpedimentsController().handle
    );
    routes.put("/impediments/:uid", new UpdateImpedimentsController().handle);
    routes.get("/impediments/:uid", new GetOneImpedimentsController().handle);
    routes.get("/impediments", new GetAllImpedimentsController().handle);

    return routes;
  }
}
