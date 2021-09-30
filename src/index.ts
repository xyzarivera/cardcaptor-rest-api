import App from "./app";
import DatabaseConnectionManager from "./database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

DatabaseConnectionManager.connect().then(() => {
  const app: App = App.getDefault();
  app.start();
});

// const app: App = App.getDefault();
// app.start();
