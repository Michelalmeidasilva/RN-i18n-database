import { SQLiteDatabase, openDatabase } from "react-native-sqlite-storage";

type Migration = (db: SQLiteDatabase) => Promise<void>;

// Uncomment the following line to see SQLite logs.
// DEBUG(true);

export class DowngradeError extends Error {
  constructor() {
    super();
    this.name = "DowngradeError";
  }
}

/**
 * This class handles the database's behavior and the responsability to execute the migrations,
 * and the pragma_version.
 */
export default class Database {
  private isConnected = false;
  private name: string;
  private migrations: Migration[];
  private database: SQLiteDatabase | null = null;

  /**
   * Reference a name to database and makes the migrations available.
   *
   * @param name The database name.
   * @param migrations an array with the migrations to execute.
   */
  constructor(name: string, migrations: Migration[]) {
    this.name = name;
    this.migrations = migrations;
  }

  /**
   * This function tests if a database connection has been established or not.
   * You can use this to provide a controlled response to connection failure.
   *
   */
  public get connected(): boolean {
    return this.isConnected;
  }

  /**
   * Exposes methods to access a database.
   * @returns the database if exists
   */
  public get db(): SQLiteDatabase | null {
    return this.database;
  }

  /**
   * This function proposes an interface to open a new database connection.
   * If isn't connected yet, the method {@link openDatabase} is called to open Database and the version of database is checked to run or not the migrations.
   * If any error occurs in this method, the Exception `SQLiteClient: failed to connect to database` is thrown.
   */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      this.database = await openDatabase({
        name: this.name,
        location: "default",
      });

      const resultSet = await this.database.executeSql("PRAGMA user_version");
      const version: number = resultSet[0].rows.item(0).user_version;
      const nextVersion = this.migrations.length;

      if (version > nextVersion) {
        throw new DowngradeError();
      }

      this.migrations.map(async (migration) => {
        return this.database !== null && (await migration(this.database));
      });

      if (version !== nextVersion) {
        await this.database.executeSql(`PRAGMA user_version = ${nextVersion}`);
      }

      this.isConnected = true;
    } catch (error) {
      if (error instanceof DowngradeError) {
        throw error;
      }
      throw new Error(
        `SQLiteClient: failed to connect to database: ${this.name}`
      );
    }
  }

  /**
   * If the database already created, retrieves a instance of database.
   * if doesn't have any database yet, returns a new instance of the database object {@link SQLiteDatabase}.
   * @return the database instance.
   */
  public async getInstance(): Promise<SQLiteDatabase> {
    if (this.database) return this.database;

    const newDatabaseInstance = await openDatabase({
      name: this.name,
      location: "default",
    });

    this.database = newDatabaseInstance;

    return newDatabaseInstance;
  }

  /**
   * Releases a reference to the object, closing the object if the last reference was released.
   */
  public async close(): Promise<void> {
    if (this.database === null) return;

    await this.database.close();

    this.database = null;
  }
}
