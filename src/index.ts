import App from "./app";
// import DatabaseConnectionManager from "./database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// require("dotenv").config();

// DatabaseConnectionManager.connect().then(() => {
//   const app: App = App.getDefault();
//   app.start();
// });

const app: App = App.getDefault();
app.start();

// import express from "express";
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hellooooo");
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`App listening on PORT ${port}`));
