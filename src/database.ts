import mysql from "@mysql/xdevapi";
import request from "request-promise-native";
import winston from "winston";

const options = {
  host: "localhost",
  password: "superR00T",
  port: 33060,
  user: "root"
};

// interface ISumo {
//   position: number;
//   shikona: string;
//   rikishi_id: string;
//   heya: string;
//   rank: string;
// }

interface ISumo {
  banzuke_id: number;
  rikishi_id: string;
  shikona: string;
  banzuke_name: string;
  heya_name: string;
}

export const getSumoRanks = async () => {
  const data: ISumo[] = [];
  const session = await mysql.getSession(options);
  await session
    .getSchema("sumo")
    .getTable("rankings")
    .select(["shikona", "rikishi_id", "heya", "rank"])
    .execute((row: ISumo) => {
      data.push(row);
    });
  session.close();
  return data;
};

export const updateSumoRanks = async () => {
  // Get Sumo data from Sumo.or.jp
  const getResp = await request.get(
    "http://sumo.or.jp/EnHonbashoBanzuke/index_ajax/1/1/",
    (err, resp, body) => {
      if (err) {
        return winston.error(err);
      }
      return JSON.parse(body);
    }
  );
  const sumoData = JSON.parse(getResp);

  // Open datbase connection
  const session = await mysql.getSession(options);
  const table = await session.getSchema("sumo").getTable("rankings");

  // Clear the table ready for new data
  table.delete("true").execute();
  // Loop through results to insert each element

  sumoData.BanzukeTable.forEach(async (sumo: ISumo) => {
    if (sumo.banzuke_id) {
      return await table
        .insert(`position`, `rikishi_id`, `shikona`, `rank`, `heya`)
        .values(
          sumo.banzuke_id,
          sumo.rikishi_id,
          sumo.shikona,
          sumo.banzuke_name,
          sumo.heya_name
        )
        .execute();
    }
  });
  session.close();
  return 200;
};
