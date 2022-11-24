import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668983960028 implements MigrationInterface {
    name = 'default1668983960028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" SERIAL NOT NULL, "value" numeric(12,2) NOT NULL DEFAULT '100', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date, "creditedAccountId" integer, "debitedAccountId" integer, CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Accounts" ("id" SERIAL NOT NULL, "balance" numeric(12,2) NOT NULL DEFAULT '100', CONSTRAINT "PK_215996d902f717c5a3a0b54194e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "accountId" integer, CONSTRAINT "REL_13f7031faec63ad1ad7c9ad6a2" UNIQUE ("accountId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_76ade6f775352ef0eebcb78f16f" FOREIGN KEY ("creditedAccountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_8f0050abe277e9f24b93128f975" FOREIGN KEY ("debitedAccountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_8f0050abe277e9f24b93128f975"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_76ade6f775352ef0eebcb78f16f"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Accounts"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
    }

}
