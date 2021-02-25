import React, { useState } from "react";
import { ActivityIndicator, LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset, useAssets } from "expo-asset";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import { Roboto_300Light } from "@expo-google-fonts/roboto";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import ExploreMoviesScreen from "./src/screens/ExploreMoviesScreen";
import MovieDetailScreen from "./src/screens/MovieDetailScreen/MovieDetailScreen";
import * as firebase from "firebase";
import apiKeys from "./config/keys";

const Stack = createStackNavigator();

const config2 = {
  animation: "spring",
  config: {
    stiffness: 500,
    damping: 100,
    mass: 2,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function App() {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
    Roboto_300Light,
  });

  const [assetsLoaded] = useAssets([
    require("./src/assets/images/login_bg.png"),
    require("./src/assets/images/login_bg2.png"),
  ]);

  // console.log("Fonts loaded: " + fontsLoaded);
  // console.log("Assets loaded: " + assetsLoaded);

  if (!fontsLoaded || !assetsLoaded) {
    return <ActivityIndicator size={100} color="gray" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config2,
            close: config2,
          },
        }}
      >
        <Stack.Screen
          name={"Loading"}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExploreMovies"
          component={ExploreMoviesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"MovieDetail"}
          component={MovieDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
