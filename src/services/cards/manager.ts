import { getRepository, Repository, DeleteResult } from "typeorm";
import SakuraCard from "../../entities/SakuraCardModel";
import { IManager } from "../common/manager";

class CardManager implements IManager {
  protected SakuraCardRepository: Repository<SakuraCard>;

  constructor() {
    this.SakuraCardRepository = getRepository(SakuraCard);
  }

  /**
   * Get all SakuraCards
   */
   public async getAllSakuraCards(): Promise<SakuraCard[]> {
    const SakuraCardData = await this.SakuraCardRepository.query("SELECT * FROM sakura_cards");
    console.log(SakuraCardData);
    return SakuraCardData;
    // return Promise.resolve(new SakuraCard()); -- tells that we should return a resolved Promise with SakuraCard pro
  }

  /**
   * Get a SakuraCard by primary key
   */
  public async getSakuraCard(IdOrName: string): Promise<SakuraCard> {
    const SakuraCardData = await this.SakuraCardRepository.findOne({ cardName: IdOrName });
    return SakuraCardData;
    // return Promise.resolve(new SakuraCard()); -- tells that we should return a resolved Promise with SakuraCard pro
  }

//   /**
//    * Create a new SakuraCard
//    */
//   public async createSakuraCard(SakuraCardDetails: Partial<SakuraCardInput>): Promise<SakuraCard> {
//     // 1. Hash password
//     const saltRound = 10;
//     const passwordHash = await bcrypt.hash(SakuraCardDetails.password, saltRound);

//     // 2. Create SakuraCard
//     const newSakuraCard = new SakuraCard();
//     newSakuraCard.SakuraCardname = SakuraCardDetails.SakuraCardname;
//     newSakuraCard.passwordHash = passwordHash;

//     return this.SakuraCardRepository.save(newSakuraCard);
//   }

//   /**
//    * Update SakuraCard details
//    *
//    */
//   public async updateSakuraCard(SakuraCardId: string, updates: Partial<SakuraCard>): Promise<SakuraCard> {
//     // console.log("UPDATES", updates);
//     const updateData = await this.SakuraCardRepository.update(SakuraCardId, updates);
//     // console.log("updateData", updateData);
//     const updatedSakuraCard = await this.SakuraCardRepository.findOne(SakuraCardId);
//     // console.log("updatedSakuraCard", updatedSakuraCard);
//     return updatedSakuraCard;
//     // return Promise.resolve(new SakuraCard());
//   }

//   /**
//    * Delete SakuraCard
//    *
//    */
//   public async removeSakuraCard(SakuraCardId: string): Promise<DeleteResult | void> {
//     const deleteData = await this.SakuraCardRepository.delete(SakuraCardId);
//     // console.log("deleteData", deleteData);
//     return Promise.resolve();
//   }

}

export default CardManager;
