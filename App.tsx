/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "styled-components/native";

import "./src/locales/i18n"; // <-- this line added
import { DatabaseProvider, useDatabase } from "./src/context/DatabaseProvider";

import { Home } from "./src/screens";
import { Header } from "./src/components";
import useTerminologies from "./src/hooks/terminologies";

export const lightTheme = {
  body: "#FFF",
  text: "#363537",
  toggleBorder: "#FFF",
  background: "#363537",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#999",
};
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const scheme = useColorScheme();
  const { isLoading: isLoadingDatabase } = useDatabase();
  const { isLoading: isLoadingTerminologies } = useTerminologies();

  return (
    <DatabaseProvider>
      {isLoadingDatabase || isLoadingTerminologies ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                header: (): JSX.Element => <Header />,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      )}
    </DatabaseProvider>
  );
};

export default App;
