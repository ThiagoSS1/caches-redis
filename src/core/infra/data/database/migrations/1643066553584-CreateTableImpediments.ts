import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableImpediments1643066553584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(
            new Table({
                name: "projects",
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
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "resolve",
                        type: "bool",
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true,
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
