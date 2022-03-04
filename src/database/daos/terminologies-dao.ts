import { database } from "../../utils/database";

import { Terminologies } from "../models";

export class TerminologiesDAO {
  private static instance?: TerminologiesDAO;

  public static getInstance(): TerminologiesDAO {
    if (this.instance) return this.instance;

    const newInstance = new TerminologiesDAO();

    this.instance = newInstance;

    return newInstance;
  }

  public async getTerminologies(): Promise<Terminologies> {
    const terminologies = new Terminologies();

    try {
      const db = await database.getInstance();

      await db.transaction((trx) => {
        trx.executeSql(
          `
          SELECT * FROM TERMINOLOGIES
      `,
          [],
          (_, result) => {
            const terminologiesFound = result.rows.item(0) as Terminologies;
            Object.assign(terminologies, terminologiesFound);
          }
        );
      });
    } catch (err) {
      console.log("err get terminologies", err);
    }

    return terminologies;
  }

  public async insertOne(terminologies: Terminologies): Promise<void> {
    const db = await database.getInstance();

    try {
      await db.transaction((trx) => {
        trx.executeSql(
          `
          INSERT INTO TERMINOLOGIES (
            es,
            en
            )
            VALUES (?, ?);
          `,
          [terminologies.es, terminologies.en]
        );
      });
    } catch (err) {
      console.log("insertOne Error", err);
    }
  }
}
