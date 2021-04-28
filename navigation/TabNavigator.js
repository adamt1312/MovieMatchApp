import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ExploreMoviesScreen from "../src/screens/ExploreMoviesScreen/ExploreMoviesScreen";
import FindMatchScreen from "../src/screens/FindMatchScreen/FindMatchScreen";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const activeTintColor = "#e91e63";
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: activeTintColor,
        style: { height: 55 },
      }}
    >
      <Tab.Screen
        name="ExploreMovies"
        component={ExploreMoviesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 15,
                marginBottom: 3,
                color: focused ? activeTintColor : "black",
              }}
            >
              Explore movies
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FindMatchScreen"
        component={FindMatchScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 14,
                marginBottom: 3,
                color: focused ? activeTintColor : "black",
              }}
            >
              Find a Match
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-plus" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
