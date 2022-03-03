export interface TerminologiesResponse {
  data: {
    attributes: {
      // en: {
      //   home: HomeTerminologies;
      // };
      // es: {
      //   home: HomeTerminologies;
      // };
      en: any;
      es: any;
    };
  };
}

export interface HomeTerminologies {
  header: any;
  footer: any;
  confirm_buttom: any;
}

export type LanguageKeys = "pt" | "es" | "en";

export const fetchTerminologies = (): TerminologiesResponse => {
  const terminologies = {
    data: {
      attributes: {
        en: {
          home: {
            footer: {
              title: "created by Michel Almeida",
            },
            confirm_buttom: {
              title: "confirm",
            },
            header: {
              title: "Introduction",
            },
          },
        },
        es: {
          home: {
            footer: {
              title: "creacíon de Michel Almeida",
            },
            confirm_buttom: {
              title: "confirmar",
            },
            header: {
              title: "introduccion",
            },
          },
        },
      },
    },
  };
  return terminologies;
};
