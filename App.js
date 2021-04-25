import React from "react";
import {
  ActivityIndicator,
  LogBox,
  StatusBar,
  View,
  StyleSheet,
} from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import { NavigationContainer } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import { Roboto_300Light } from "@expo-google-fonts/roboto";
import * as firebase from "firebase";
import apiKeys from "./config/keys";
import { MainStackNavigator } from "./navigation/StackNavigator";
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen";
import SessionScreen from "./src/screens/SessionScreen/SessionScreen";

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

  if (!fontsLoaded || !assetsLoaded) {
    return <ActivityIndicator size={100} color="gray" />;
  }

  return (
    <NavigationContainer>
      <MainStackNavigator />
      <StatusBar hidden={true} translucent={true} currentHeight={200} />
    </NavigationContainer>
  );
}
