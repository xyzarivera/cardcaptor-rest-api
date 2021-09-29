import {MigrationInterface, QueryRunner} from "typeorm";

export class createSakuraCardModel1632915847781 implements MigrationInterface {
    name = 'createSakuraCardModel1632915847781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sakura_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardName" character varying(100) NOT NULL, "isMainCard" boolean NOT NULL, "attribute" character varying, "sign" character varying NOT NULL, "magicType" character varying NOT NULL, "captureOrderAnime" integer NOT NULL, "captureOrderManga" integer, "transformOrderAnime" integer NOT NULL, "transformOrderManga" integer, "clowCardForm" character varying, "sakuraCardForm" character varying, CONSTRAINT "PK_92ca93cacfb858b8d4e99710158" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sakura_cards"`);
    }

}
