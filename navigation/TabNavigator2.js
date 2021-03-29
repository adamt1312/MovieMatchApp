import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import LikedMoviesScreen from "../src/screens/LibraryScreen/LikedMoviesScreen";
import DislikedMoviesScreen from "../src/screens/LibraryScreen/DislikedMoviesScreen";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator2 = () => {
  const activeTintColor = "#e91e63";
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: activeTintColor,
      }}
    >
      <Tab.Screen
        name="LikedMoviesScreen"
        component={LikedMoviesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 15,
                color: focused ? activeTintColor : "black",
              }}
            >
              Liked Movies
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DislikedMoviesScreen"
        component={DislikedMoviesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 14,
                color: focused ? activeTintColor : "black",
              }}
            >
              Matched movies
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator2;
