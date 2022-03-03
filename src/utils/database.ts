import { SQLiteDatabase, enablePromise } from "react-native-sqlite-storage";
import Database from "../database";
const DB_NAME = "Scaffold.db";

enablePromise(true);

/**
 * Represents the order of execution of the migrations itselves.
 * If any new migration need to be executed in the database, this migration must be added at the end of this array.
 * o keep the execution's version
 */
const DB_MIGRATIONS = [
  async (db: SQLiteDatabase): Promise<void> => {
    try {
      await db.transaction((tx) =>
        tx.executeSql(`
      CREATE TABLE IF NOT EXISTS TERMINOLOGIES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        en TEXT NOT NULL,
        es TEXT NOT NULL
        );
        `)
      );
    } catch (err) {
      console.log("error na criaçao", err);
    }
  },
];
export const database = new Database(DB_NAME, DB_MIGRATIONS);

export const initialize = async (): Promise<void> => {
  await database.connect();
};
export const close = async (): Promise<void> => {
  await database.close();
};
