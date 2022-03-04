import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { DowngradeError } from "../database";

import { initialize, close } from "../utils";

interface Context {
  isLoading: boolean;
}

const DatabaseContext = createContext<Context>({} as Context);

export const useDatabase = (): Context => useContext(DatabaseContext);

/**
 * Handles the database's behavior as a context, so, the whole code inner of it can "listen" to this workflow
 */
export const DatabaseProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const execute = async (): Promise<void> => {
      try {
        setIsLoading(true);

        await initialize();
      } catch (error) {
        if (error instanceof DowngradeError) {
          throw new Error("Downgrade database error");
        } else {
          throw new Error("Unexpected error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    execute();

    return (): void => {
      close();
    };
  }, []);

  return (
    <DatabaseContext.Provider value={{ isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
};
