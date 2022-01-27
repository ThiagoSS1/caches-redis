import { ImpedimentsEntity } from "../../../../core/infra/data/database/entities/ImpedimentEntity";
import { Impediments } from "../../domain/models/impediments";

interface ImpedimentParams {
  uid?: string;
  title: string;
  description: string;
  uid_project: string;
}

export class ImpedimentRepository {
  async create(data: ImpedimentParams): Promise<Impediments> {
    const impedimentsEntity = ImpedimentsEntity.create({
      title: data.title,
      description: data.description,
      uidProject: data.uid_project,
    });

    await impedimentsEntity.save();
    return this.mapperFromEntityToModel(impedimentsEntity);
  }

  async getByUid(uid: string): Promise<Impediments | undefined> {
    const impedimentsEntity = await ImpedimentsEntity.findOne(uid, {
      select: ["uid", "title", "description", "uidProject"],
    });
    if (!impedimentsEntity) return undefined;

    return this.mapperFromEntityToModel(impedimentsEntity);
  }

  async getAll(): Promise<Impediments[]> {
    const impedimentsEntities = await ImpedimentsEntity.find();

    return impedimentsEntities.map((impedimentEntity) =>
      this.mapperFromEntityToModel(impedimentEntity)
    );
  }

  async editImpediment(
    data: ImpedimentParams
  ): Promise<Impediments | undefined> {
    const impedimentsEntity = await ImpedimentsEntity.findOne(data.uid);

    if (!impedimentsEntity) return undefined;

    const impedimentsUpdated = ImpedimentsEntity.create({
      title: data.title,
      description: data.description,
      uid: data.uid,
    });

    await impedimentsUpdated.save();

    return this.mapperFromEntityToModel(impedimentsUpdated);
  }

  async destroy(uid: string): Promise<Impediments | undefined> {
    const impedimentsEntity = await ImpedimentsEntity.findOne(uid);

    if (!impedimentsEntity) return undefined;

    await ImpedimentsEntity.remove(impedimentsEntity);

    return this.mapperFromEntityToModel(impedimentsEntity);
  }

  private mapperFromEntityToModel(entity: ImpedimentsEntity): Impediments {
    return {
      uid: entity.uid,
      title: entity.title,
      description: entity.description,
      resolve: entity.resolve,
      uid_project: entity.uidProject,
    };
  }
}
