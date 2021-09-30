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
  private sanitize = (input: string): string => {
    return _.startCase(_.toLower(_.replace(input, new RegExp("-", "g"), " ")));
  };

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
      const SakuraCardData = await this.SakuraCardRepository.findOne({ cardName: this.sanitize(IdOrName) });
      return SakuraCardData;
  }

  /**
   * 
   * @param sakuraCardInput 
   * @returns Sakura Card object
   */
    public async createSakuraCard(sakuraCardInput: Partial<SakuraCard>): Promise<SakuraCard> {
      const newSakuraCard = new SakuraCard();
      newSakuraCard.cardName = sakuraCardInput.cardName;
      newSakuraCard.isMainCard = sakuraCardInput.isMainCard;
      newSakuraCard.attribute = sakuraCardInput.attribute;
      newSakuraCard.sign = sakuraCardInput.sign;
      newSakuraCard.magicType = sakuraCardInput.magicType;

      return this.SakuraCardRepository.save(newSakuraCard);
    }

    /**
     * 
     * @param sakuraCardName 
     * @param updates 
     * @returns 
     */
    public async updateSakuraCard(sakuraCardName: string, updates: Partial<SakuraCard>): Promise<SakuraCard> {
      const updateSakuraCard = await this.SakuraCardRepository.update(sakuraCardName, updates);
      // console.log("updateSakuraCard", updateSakuraCard);
      const updatedSakuraCard = await this.SakuraCardRepository.findOne(sakuraCardName);
      // console.log("updatedSakuraCard", updatedSakuraCard);
      return updatedSakuraCard;
    }

    /**
     * Delete SakuraCard
     *
     */
    public async removeSakuraCard(sakuraCardName: string): Promise<DeleteResult | void> {
      const deleteData = await this.SakuraCardRepository.delete(sakuraCardName);
      // console.log("deleteData", deleteData);
      return Promise.resolve();
    }
}

export default CardManager;
