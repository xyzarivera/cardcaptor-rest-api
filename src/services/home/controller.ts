import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import HomeManager from "./manager";
import BaseController from "../common/controller";

class HomeController extends BaseController {
  public path: string = "/";
  public router: Router;

  protected manager: HomeManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new HomeManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();

    router.get("/", this.get);

    return router;
  }

  /**
   * HTTP GET request handler
   */
  protected get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const greet = await this.manager.getGreeting();
      res.json(greet);

    } catch (err) {
      next(err);
    }
  };
}

export default HomeController;
