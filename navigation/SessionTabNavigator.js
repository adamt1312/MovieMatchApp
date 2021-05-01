import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import FindMatchScreen from "../src/screens/FindMatchScreen/FindMatchScreen";
import { Text } from "react-native";
import SessionScreen from "../src/screens/SessionScreens/SessionScreen";
import MatchedMoviesScreen from "../src/screens/SessionScreens/MatchedMoviesScreen";

const Tab = createBottomTabNavigator();

const SessionTabNavigator = () => {
  const activeTintColor = "#e91e63";
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: activeTintColor,
        style: {
          height: 55,
          backgroundColor: "#121212",
          borderTopColor: "#121212",
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="SessionScreen"
        component={SessionScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "VarelaRound_400Regular",
                fontSize: 15,
                marginBottom: 3,
                color: focused ? activeTintColor : "white",
              }}
            >
              Active Session
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MatchedMoviesScreen"
        component={MatchedMoviesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "VarelaRound_400Regular",
                fontSize: 15,
                marginBottom: 3,
                color: focused ? activeTintColor : "white",
              }}
            >
              Matched Movies
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SessionTabNavigator;
