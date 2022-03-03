import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Container } from "..";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation("language");

  return (
    <Container mr="100px" flexDirection="column">
      <TouchableOpacity
        style={{
          marginBottom: 10,
        }}
        onPress={() => {
          i18n.changeLanguage("es");
        }}
      >
        <Text>ES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginBottom: 10,
        }}
        onPress={() => {
          i18n.changeLanguage("en");
        }}
      >
        <Text>EN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          i18n.changeLanguage("jp");
        }}
      >
        <Text>JP</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default LanguageSwitcher;
