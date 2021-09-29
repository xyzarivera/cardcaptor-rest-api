import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import HomeManager from "./manager";
import BaseController from "../common/controller";
/**
 * FIXME
 * Advance requirements:
 * - All request handlers should verify if
 *   the authenticated user is authorized to
 *   perform operations on the specified User object
 */
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
    // router.post("/", this.post);
    // router.patch("/:userId", this.patch);
    // router.delete("/:userId", this.delete);

    return router;
  }

  /**
   * HTTP GET request handler
   */
  protected get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    //   const { userId } = req.params;
      const greet = await this.manager.getGreeting();
      console.log(greet)
      if (!greet) {
        res.status(404).send({ error: "page not found" });
        return;
      }

    //   res.json(_.pick(user, ["id", "username", "displayName"]));
      res.json(greet);
    } catch (err) {
      // Delegate error handling to Express
      // with our custom error handler in
      // `src/middleware/errorHandler.ts`
      next(err);
    }
  };
}

export default HomeController;
