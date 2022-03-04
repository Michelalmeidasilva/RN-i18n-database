import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { Container } from "../../components";

export const Home = () => {
  const { t } = useTranslation("home");

  return (
    <Container flexDirection="column" flex={1}>
      <>
        <Container flexDirection="column" flex={4} p={14}>
          <Text style={{ fontSize: 20 }}>{t("header.title")}</Text>
        </Container>

        <Container flexDirection="column" flex={5} alignItems={"center"}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 15,
              backgroundColor: "black",
              width: "50%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              {t("confirm_buttom.title")}{" "}
            </Text>
          </TouchableOpacity>
        </Container>

        <Container
          flexDirection="column"
          flex={1}
          backgroundColor={"black"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            {t("footer.title")}
          </Text>
        </Container>
      </>
    </Container>
  );
};

export default Home;
