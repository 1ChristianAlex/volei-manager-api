import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1681221663797 implements MigrationInterface {
  name = 'migration1681221663797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user"."user_role_enum" AS ENUM('admin', 'manager', 'player')`
    );
    await queryRunner.query(
      `CREATE TABLE "user"."user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "user"."user_role_enum" NOT NULL DEFAULT 'player', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "payment"."payment_status_enum" AS ENUM('0', '1', '2')`
    );
    await queryRunner.query(
      `CREATE TABLE "payment"."payment" ("id" SERIAL NOT NULL, "status" "payment"."payment_status_enum" NOT NULL DEFAULT '1', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), "value" numeric NOT NULL, "payed" numeric NOT NULL DEFAULT '0', "playerId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "game"."players" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL, "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), "hoursPlayed" integer NOT NULL, "userId" integer, "matchsId" integer, "paymentId" integer, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "game"."matchs_status_enum" AS ENUM('onGoing', 'cancel', 'finished')`
    );
    await queryRunner.query(
      `CREATE TABLE "game"."matchs" ("id" SERIAL NOT NULL, "title" text NOT NULL, "status" "game"."matchs_status_enum" NOT NULL DEFAULT 'onGoing', "datetime" TIMESTAMP NOT NULL, "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0fdbc8e05ccfb9533008b132189" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "payment"."payment" ADD CONSTRAINT "FK_8de8a192d00e33568fc1e644634" FOREIGN KEY ("playerId") REFERENCES "game"."players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "game"."players" ADD CONSTRAINT "FK_7c11c744c0601ab432cfa6ff7ad" FOREIGN KEY ("userId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "game"."players" ADD CONSTRAINT "FK_918b7f9b38ffa5b6b6b8038dfed" FOREIGN KEY ("matchsId") REFERENCES "game"."matchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "game"."players" ADD CONSTRAINT "FK_04c9192600834b63f9f2fc26245" FOREIGN KEY ("paymentId") REFERENCES "payment"."payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game"."players" DROP CONSTRAINT "FK_04c9192600834b63f9f2fc26245"`
    );
    await queryRunner.query(
      `ALTER TABLE "game"."players" DROP CONSTRAINT "FK_918b7f9b38ffa5b6b6b8038dfed"`
    );
    await queryRunner.query(
      `ALTER TABLE "game"."players" DROP CONSTRAINT "FK_7c11c744c0601ab432cfa6ff7ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment"."payment" DROP CONSTRAINT "FK_8de8a192d00e33568fc1e644634"`
    );
    await queryRunner.query(`DROP TABLE "game"."matchs"`);
    await queryRunner.query(`DROP TYPE "game"."matchs_status_enum"`);
    await queryRunner.query(`DROP TABLE "game"."players"`);
    await queryRunner.query(`DROP TABLE "payment"."payment"`);
    await queryRunner.query(`DROP TYPE "payment"."payment_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"."user"`);
    await queryRunner.query(`DROP TYPE "user"."user_role_enum"`);
  }
}
