export type LanguageValues = {
  [key in LanguageKeys]: string;
};

export interface TerminologiesResponse {
  data: {
    attributes: {
      home: HomeTerminologies;
    };
  };
}

export interface HomeTerminologies {
  header_title: LanguageValues;
  footer_title: LanguageValues;
}

export type LanguageKeys = "pt" | "es" | "en";

export const fetchTerminologies = (): TerminologiesResponse => {
  const terminologies = {
    data: {
      attributes: {
        home: {
          header_title: {
            en: "Home",
            pt: "Inicio",
            es: "Comienzo",
          },
          footer_title: {
            en: "created by michel",
            pt: "criado por michel",
            es: "creado por michel",
          },
        },
      },
    },
  };

  return terminologies;
};
