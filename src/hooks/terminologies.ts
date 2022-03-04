import { useState, useEffect } from "react";
import { fetchTerminologies } from "../services";

import { TerminologiesDAO } from "../database/daos";
import { useTranslation } from "react-i18next";

type useTerminologiesValues = {
  isLoading: boolean;
};

export default function useTerminologies(): useTerminologiesValues {
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();
  const [deviceIsConnected, setDeviceIsConnected] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const terminologiesDAO = TerminologiesDAO.getInstance();

        if (deviceIsConnected) {
          const { data } = fetchTerminologies();

          await terminologiesDAO.insertOne({
            en: JSON.stringify(data.attributes.en),
            es: JSON.stringify(data.attributes.es),
          });
        }

        const terminologies = await terminologiesDAO.getTerminologies();

        const translation = {
          en: JSON.parse(terminologies.en),
          es: JSON.parse(terminologies.es),
        };

        i18n.addResourceBundle("en", "home", translation.en.home);
        i18n.addResourceBundle("es", "home", translation.es.home);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading };
}
