import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import SignInScreen from "../src/screens/SignInScreen";
import SignUpScreen from "../src/screens/SignUpScreen";
import HomeScreen from "../src/screens/HomeScreen";
import LoadingScreen from "../src/screens/LoadingScreen";
import MovieDetailScreen from "../src/screens/MovieDetailScreen/MovieDetailScreen";
import BottomTabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import OtherProfileScreen from "../src/screens/OtherProfileScreen";

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
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
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
        name={"OtherProfile"}
        component={OtherProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
