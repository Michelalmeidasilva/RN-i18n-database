import React from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Container } from "..";
import { LanguageSwitcher } from "../LanguageSwitcher";

const HeaderComponent = (): JSX.Element => {
  const { top } = useSafeAreaInsets();

  return (
    <Container
      pt={top}
      backgroundColor="white"
      flexDirection="row"
      height={75 + top}
      zIndex={2}
      pl="10px"
    >
      <LanguageSwitcher />

      <Container flexDirection="column" flex={8}>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Home
        </Text>
      </Container>
    </Container>
  );
};

export default HeaderComponent;
