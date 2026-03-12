import { MigrationInterface, QueryRunner } from "typeorm";

export class NewFieldsCategory1773329816328 implements MigrationInterface {
    name = 'NewFieldsCategory1773329816328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(800)`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "cover_image" character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }
}
