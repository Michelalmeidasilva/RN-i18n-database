import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { Container } from "../../components";
import { useLanguage } from "../../context/LanguageProvider";

import { fetchTerminologies, HomeTerminologies } from "../../services";

export const Home = () => {
  const { language } = useLanguage();

  const [homeTerminologies, setHomeTerminologies] =
    useState<HomeTerminologies>();

  useEffect(() => {
    const fetchData = () => {
      const { data } = fetchTerminologies();

      setHomeTerminologies(data.attributes.home);
    };

    fetchData();
  }, []);

  return (
    <Container orientation="row" flex={1}>
      <Container orientation="column" flex={9}>
        <Text>{homeTerminologies?.header_title[language]}</Text>
      </Container>

      <Container orientation="column">
        <Button title={"test"} />
      </Container>

      <Container orientation="column" flex={1}>
        <Text>{homeTerminologies?.footer_title[language]}</Text>
      </Container>
    </Container>
  );
};

export default Home;
