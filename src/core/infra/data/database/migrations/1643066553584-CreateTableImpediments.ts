import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableImpediments1643066553584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(
            new Table({
                name: "impediments",
                columns: [
                    {
                        name: "uid",
                        type: "UUID",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "resolve",
                        type: "bool",
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: "uid_project",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                      name: "fk_impediments_projects",
                      columnNames: ["uid_project"],
                      referencedTableName: "projects",
                      referencedColumnNames: ["uid"],
                    }),
                  ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("impediments", true, true, true);
    }

}
