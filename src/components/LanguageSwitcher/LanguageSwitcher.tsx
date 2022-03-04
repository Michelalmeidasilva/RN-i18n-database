import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Container } from "..";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation("language");

  return (
    <Container mr="100px" p={"5px"} flexDirection="row" flex={2}>
      <TouchableOpacity
        style={{
          marginRight: 10,
        }}
        onPress={() => {
          i18n.changeLanguage("es");
        }}
      >
        <Text>ES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginRight: 10,
        }}
        onPress={() => {
          i18n.changeLanguage("en");
        }}
      >
        <Text>EN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          i18n.changeLanguage("pt");
        }}
      >
        <Text>PT</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default LanguageSwitcher;
