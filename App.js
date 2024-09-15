// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home/HomeScreen';
import ResultScreen from './screens/receiveResult/receiveResult';
import HistoryScreen from './screens/viewHistory/viewHistory';
import QuizScreen from './screens/questionaire/questionaire';
import Logo from './screens/logo/logo';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
  return Font.loadAsync({
    'NettoBlack': require('./assets/font/Netto-Black.ttf'),
    'NettoBold': require('./assets/font/Netto-Bold.ttf'),
    'NettoRegular': require('./assets/font/Netto-Regular.ttf'),
  });
};

const Stack = createStackNavigator();

const PhotoContext = createContext();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(false); // Manage photo selection state

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
    <PhotoContext.Provider value={{ photoSelected, setPhotoSelected }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Logo">
        <Stack.Screen
            name="Splash"
            component={Logo}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PhotoContext.Provider>
  );
};

export default App;
export { PhotoContext };
