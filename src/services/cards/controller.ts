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
    router.get("/:IdOrName", this.getCard);
    // router.post("/", this.post);
    // router.patch("/:userId", this.patch);
    // router.delete("/:userId", this.delete);

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
      const { IdOrName } = req.params;

      const card = await this.manager.getSakuraCard(IdOrName);
      if (!card) {
        res.status(404).send({ error: "Sakura Card not found" });
        return;
      }

      res.json(_.pick(card, ["cardName", "isMainCard", "attribute", "sign", "magicType"]));
    } catch (err) {
      next(err);
    }
  };

//   /**
//    * HTTP POST request handler
//    */
//   protected post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const userDetails = req.body;
//       const user = await this.manager.createSakuraCard(userDetails);

//       res.status(201).json(_.pick(user, ["id", "username", "displayName"]));
//     } catch (err) {
//       next(err);
//     }
//   };

//   /**
//    * HTTP PATCH request handler
//    */
//   protected patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const { userId } = req.params;
//       const newUserDetails = req.body;
//       const updatedUser = await this.manager.updateSakuraCard(userId, newUserDetails);

//       res.json(_.pick(updatedUser, ["id", "username", "displayName"]));
//     } catch (err) {
//       next(err);
//     }
//   };

//   /**
//    * HTTP DELETE request handler
//    */
//   protected delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { userId } = req.params;

//     try {
//       await this.manager.removeSakuraCard(userId);
//       res.status(200).end();
//     } catch (err) {
//       next(err);
//     }
//   };
}

export default CardController;
