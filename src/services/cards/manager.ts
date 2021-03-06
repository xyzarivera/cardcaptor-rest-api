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
    return SakuraCardsData;
  }

  /**
   *
   * @param cardName - Sakura Card unique identifier
   * @returns - Sakura Card object
   */
  public async getSakuraCard(cardName: string): Promise<SakuraCard> {
    const SakuraCardData = await this.SakuraCardRepository.findOne({ cardName: this.sanitize(cardName) });
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
   * @param cardName
   * @param updates
   * @returns
   */
  public async updateSakuraCard(cardName: string, updates: Partial<SakuraCard>): Promise<string | SakuraCard> {
    if (updates.cardName) {
      return "You are not allowed to change the name of your Sakura Card."
    }
    const updateSakuraCard = await this.SakuraCardRepository.update({ cardName: this.sanitize(cardName) }, updates);
    const updatedSakuraCard = await this.SakuraCardRepository.findOne({ cardName: this.sanitize(cardName) });
    return updatedSakuraCard;
  }

  /**
   * Delete SakuraCard
   *
   */
  public async removeSakuraCard(cardName: string): Promise<DeleteResult | string> {
    const deleteData = await this.SakuraCardRepository.delete({ cardName: this.sanitize(cardName) });
    if (deleteData.affected === 0) {
      return "No Sakura Card to destroy."
    }
    return deleteData;
  }
}

export default CardManager;
