import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home/HomeScreen";
import ResultScreen from "./screens/receiveResult/receiveResult";
import Questionnaire from "./screens/questionaire/questionaire";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
  return Font.loadAsync({
    NettoBlack: require("./assets/font/Netto-Black.ttf"),
    NettoBold: require("./assets/font/Netto-Bold.ttf"),
    NettoRegular: require("./assets/font/Netto-Regular.ttf"),
  });
};

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
      } catch (error) {
        console.error(error);
      } finally {
        setFontsLoaded(true);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ headerShown: false }} // Ẩn thanh tiêu đề cho màn hình Home
    //     />
    //     <Stack.Screen
    //       name="Result"
    //       component={ResultScreen}
    //       options={{ headerShown: false }} // Ẩn thanh tiêu đề cho màn hình Result
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Questionnaire />
  );
};

export default App;
