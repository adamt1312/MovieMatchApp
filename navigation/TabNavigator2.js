import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
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
        style: {
          height: 56,
          backgroundColor: "#121212",
          borderTopColor: "#121212",
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="LikedMoviesScreen"
        component={LikedMoviesScreen}
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
              Liked Movies
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="like2" size={24} color={color} />
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
                fontFamily: "VarelaRound_400Regular",
                fontSize: 15,
                marginBottom: 3,
                color: focused ? activeTintColor : "white",
              }}
            >
              Disliked Movies
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dislike2" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator2;
