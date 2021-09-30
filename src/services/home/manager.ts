import { IManager } from "../common/manager";

class HomeManager implements IManager {

  constructor() {

  }

  /**
   * Return a greeting as a test
   */
  public async getGreeting(): Promise<string> {
    return "hello my friend";
  }
}

export default HomeManager;
