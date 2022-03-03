import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native";
import { Container } from "../../components";

export const Home = () => {
  const { t } = useTranslation("home");

  return (
    <Container flexDirection="column" flex={1}>
      <>
        <Container flexDirection="column" flex={4}>
          <Text style={{ fontSize: 20 }}>{t("header.title")}</Text>
        </Container>

        <Container flexDirection="column" flex={5}>
          <Button title={t("confirm_buttom.title")} />
        </Container>

        <Container flexDirection="column" flex={1}>
          <Text style={{ fontSize: 20 }}>{t("footer.title")}</Text>
        </Container>
      </>
    </Container>
  );
};

export default Home;
