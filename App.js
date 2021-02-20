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
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ExploreMoviesScreen from "./screens/ExploreMoviesScreen";
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
    require("./assets/images/login_bg.png"),
    require("./assets/images/login_bg2.png"),
  ]);

  console.log("Fonts loaded: " + fontsLoaded);
  console.log("Assets loaded: " + assetsLoaded);

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
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExploreMoviesScreen"
          component={ExploreMoviesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
