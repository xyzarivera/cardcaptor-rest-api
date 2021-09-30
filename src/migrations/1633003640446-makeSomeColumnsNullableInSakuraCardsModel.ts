import {MigrationInterface, QueryRunner} from "typeorm";

export class makeSomeColumnsNullableInSakuraCardsModel1633003640446 implements MigrationInterface {
    name = 'makeSomeColumnsNullableInSakuraCardsModel1633003640446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sakura_cards" ALTER COLUMN "captureOrderAnime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sakura_cards" ALTER COLUMN "transformOrderAnime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sakura_cards" ALTER COLUMN "transformOrderAnime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sakura_cards" ALTER COLUMN "captureOrderAnime" SET NOT NULL`);
    }

}
