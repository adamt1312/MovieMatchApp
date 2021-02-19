import * as React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import signInScreen from "./Screens/signInScreen";
import signUpScreen from "./Screens/signUpScreen";
import homeScreen from "./Screens/homeScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import exploreMoviesScreen from "./Screens/exploreMoviesScreen";
import * as firebase from "firebase";
import { registration } from "./API/firebaseMethods";
import apiKeys from "./config/keys";

const Stack = createStackNavigator();

const config2 = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
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
          component={signInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={signUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={homeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="rmc"
          component={exploreMoviesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
