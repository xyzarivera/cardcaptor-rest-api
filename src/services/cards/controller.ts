import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import CardManager from "./manager";
import BaseController from "../common/controller";

class CardController extends BaseController {
  public path: string = "/cards";
  public router: Router;

  protected manager: CardManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new CardManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();

    router.get("/", this.getAll);
    router.get("/:cardName", this.getCard);
    router.post("/", this.post);
    router.patch("/:cardName", this.patch);
    router.delete("/:cardName", this.delete);

    return router;
  }

  /**
   * HTTP GET request handler for getting all cards
   */
  protected getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cards = await this.manager.getAllSakuraCards();
      if (!cards) {
        res.status(404).send({ error: "Sakura Cards not found" });
        return;
      }

      res.json(cards);
    } catch (err) {
      next(err);
    }
  };

  /**
   * HTTP GET request handler for getting a specific card
   */
  protected getCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cardName } = req.params;

      const card = await this.manager.getSakuraCard(cardName);
      if (!card) {
        res.status(404).send({ error: "Sakura Card not found" });
        return;
      }

      res.json(_.pick(card, ["cardName", "isMainCard", "attribute", "sign", "magicType"]));
    } catch (err) {
      next(err);
    }
  };

  /**
   * HTTP POST request handler
   */
  protected post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sakuraCardInput = req.body;
      const sakuraCard = await this.manager.createSakuraCard(sakuraCardInput);

      res.status(201).json(_.pick(sakuraCard, ["cardName", "isMainCard", "attribute", "sign", "magicType"]));
    } catch (err) {
      next(err);
    }
  };

  /**
   * HTTP PATCH request handler
   */
  protected patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cardName } = req.params;
      const cardDetails = req.body;
      const updatedSakuraCard = await this.manager.updateSakuraCard(cardName, cardDetails);

      if (typeof updatedSakuraCard === "string") {
        res.json(updatedSakuraCard);
      }

      res.json(_.pick(updatedSakuraCard, ["cardName", "isMainCard", "attribute", "sign", "magicType"]));

    } catch (err) {
      next(err);
    }
  };

  /**
   * HTTP DELETE request handler
   */
  protected delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { cardName } = req.params;

    try {
      const deletedSakuraCard = await this.manager.removeSakuraCard(cardName);
      if (typeof deletedSakuraCard === "string") {
        res.json(deletedSakuraCard);
      }
        res.json("Sakura Card destroyed.");
        res.status(200).end();
    } catch (err) {
      next(err);
    }
  };
}

export default CardController;
