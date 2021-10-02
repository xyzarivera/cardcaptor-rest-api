import { IManager } from "../common/manager";

class HomeManager implements IManager {

  constructor() {

  }

  /**
   * Return a greeting as a test
   */
  public async getGreeting(): Promise<string> {
    return "Welcome to Cardcaptor Xyza's API! ";
  }
}

export default HomeManager;
