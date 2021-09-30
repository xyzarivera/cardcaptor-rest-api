import { getRepository, Repository, DeleteResult } from "typeorm";
import SakuraCard from "../../entities/SakuraCardModel";
import { IManager } from "../common/manager";
import _ from "lodash";

class CardManager implements IManager {
  protected SakuraCardRepository: Repository<SakuraCard>;

  constructor() {
    this.SakuraCardRepository = getRepository(SakuraCard);
  }

    /**
   * Replaces hypens to string and capitalizes first letter of each word
   * @param input - string to sanitize
   * @returns - sanitized string
   */
     private sanitize = (input:string) : string => {
      return _.startCase(_.toLower(_.replace(input,new RegExp("-","g")," ")));
    }

  /**
   * 
   * @returns Array of All Sakura Card objects
   */
   public async getAllSakuraCards(): Promise<SakuraCard[]> {
    const SakuraCardsData = await this.SakuraCardRepository.query("SELECT * FROM sakura_cards");
    console.log(SakuraCardsData);
    return SakuraCardsData;
  }

  /**
   * 
   * @param IdOrName - Sakura Card unique identifier
   * @returns - Sakura Card object
   */
  public async getSakuraCard(IdOrName: string): Promise<SakuraCard> {
    const SakuraCardData = await this.SakuraCardRepository.findOne({ id: IdOrName });
    return SakuraCardData;
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
