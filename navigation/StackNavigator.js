import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import SignInScreen from "../src/screens/SignInScreen/SignInScreen";
import SignUpScreen from "../src/screens/SignUpScreen/SignUpScreen";
import HomeScreen from "../src/screens/HomeScreen/HomeScreen";
import LoadingScreen from "../src/screens/LoadingScreen/LoadingScreen";
import MovieDetailScreen from "../src/screens/MovieDetailScreen/MovieDetailScreen";
import BottomTabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import LikedMoviesScreen from "../src/screens/LibraryScreen/LikedMoviesScreen";
import BottomTabNavigator2 from "./TabNavigator2";

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

const MainStackNavigator = () => {
  return (
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
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"BottomTabNavigator"}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"MovieDetail"}
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Library"}
        component={LikedMoviesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"BottomTabNavigator2"}
        component={BottomTabNavigator2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
