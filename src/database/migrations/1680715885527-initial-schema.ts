import { MigrationInterface, QueryRunner } from 'typeorm';
import { tableSchemas } from '../tableSchemas';

export class initialSchema1680715885527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      Object.values(tableSchemas).map((schema) => queryRunner.createSchema(schema))
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      Object.values(tableSchemas).map((schema) => queryRunner.dropSchema(schema))
    );
  }
}
