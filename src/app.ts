import express, { Application } from "express";
import { Middleware, ErrorHandlingMiddleware } from "./middleware/types";
import BaseController from "./services/common/controller";
import loggerMiddleware from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import HomeController from "./services/home/controller";

interface AppConfig {
  services: BaseController[];
  port?: number;
  middleware?: Middleware[];
  errorHandlers?: ErrorHandlingMiddleware[];
}

class App {
  /* Constants, default config */
  public static readonly DEFAULT_PORT: number = 3000;

  /* Instance properties */
  public readonly app: Application;
  public readonly port: number;
  public readonly appSecret: string;

  protected postStartHook: () => void;

  constructor({ port, middleware, services, errorHandlers }: AppConfig) {

    this.app = express();

    this.port = port || App.DEFAULT_PORT;
    console.log(`port is ${port}`);

    this.registerMiddleware(middleware);
    this.registerServices(services);

    // Error handler must be added after routes and middleware
    this.registerErrorHandlers(errorHandlers);

    this.postStartHook = () => {
      console.log(`App listening on localhost:${this.port}`);
    };
  }

  public start(): void {
    this.app.listen(/* Port number */ this.port, /* Callback */ this.postStartHook);
  }

  /**
   * Register middleware with our Express app
   */
  protected registerMiddleware(middleware: (Middleware | ErrorHandlingMiddleware)[]): void {
    middleware.forEach((_middleware) => this.app.use(_middleware));
  }

  /**
   * Register services with our Express app
   */
  protected registerServices(services: BaseController[]): void {
    services.forEach((_service) => this.app.use(_service.path, _service.router));
  }

  /**
   * Register error handlers with our Express app
   */
  protected registerErrorHandlers(errorHandlers: ErrorHandlingMiddleware[]): void {
    errorHandlers.forEach((_errorHandler) => this.app.use(errorHandlers));
  }

  /**
   * A factory function that returns an instance
   * of App with default configurations
   */

  static getDefault(): App {
    return new App({
      port: 5000,
      services: [
        /* Where we register our services */
        new HomeController
      ],
      middleware: [
        express.json(),
        express.urlencoded({ extended: true }),

        /* Log incoming requests */
        loggerMiddleware,
      ],
      errorHandlers: [
        /* Handle errors */
        errorHandler,
      ],
    });
  }
}

export default App;
