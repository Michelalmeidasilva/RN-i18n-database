import React, { FC, useContext, createContext, useState } from "react";
import { LanguageKeys } from "../services/terminologies";

interface ContextProps {
  language: LanguageKeys;
  switchLanguage(value: string): void;
}

const LanguageContext = createContext({} as ContextProps);

const useLanguage: () => ContextProps = () => useContext(LanguageContext);

const LanguageProvider: FC = ({ children }) => {
  const [language, setLanguage] = useState<LanguageKeys>("en");

  const switchLanguage = (value: LanguageKeys) => {
    setLanguage(value);
  };
  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, useLanguage };
