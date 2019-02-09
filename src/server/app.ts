import express from "express";
import winston from "winston";
import * as database from "./database";

const app = express();
const port = 3000;

app.use(express.static(__dirname + "./../../")); // serves the index.html

// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/update-rankings", (req, res) => {
  database.updateSumoRanks();
  res.send("Updating Sumo Rankings...");
});

app.get("/get-rankings", async (req, res) => {
  const results = await database.getSumoRanks();
  return res.send(results);
});

app.listen(port, () =>
  winston.log("info", `Fantasy Sumo Server listening on port ${port}!`)
);
