import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import SakuraCard from "../entities/SakuraCardModel";
import cards from "./cards1.json";

export default class SeedSakuraCards implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().insert().into(SakuraCard).values(cards).execute();
  }
}
