import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
import { ProjectEntity } from "./ProjectEntity";
  
  @Entity({ name: "impediments" })
  export class ImpedimentsEntity extends BaseEntity {
    @PrimaryColumn()
    uid!: string;
  
    @Column()
    title!: string;
  
    @Column()
    description!: string;
  
    @Column()
    resolve!: boolean;
  
    @Column({ name: "uid_project" })
    uidProject!: string;
  
    @Column({ name: "created_at" })
    createdAt!: Date;
  
    @Column({ name: "updated_at" })
    updatedAt!: Date;

    @OneToOne((_) => ProjectEntity)
    @JoinColumn({name: "uid_project", referencedColumnName: "uid"})
    profile!: ProjectEntity;

    @BeforeInsert()
    private beforeInsert() {
      this.uid = uuid();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  
    @BeforeUpdate()
    private beforeUpdate() {
      this.updatedAt = new Date();
    }
  }