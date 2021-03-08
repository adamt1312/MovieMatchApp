import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";
import homeScreen from "../src/screens/HomeScreen";
import MyProfileScreen from "../src/screens/MyProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OtherProfileScreen from "../src/screens/OtherProfileScreen";
import { color } from "react-native-reanimated";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const activeTintColor = "#e91e63";
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={homeScreen}
        options={{
          drawerIcon: (config) => (
            <AntDesign name="home" size={40} color="black" />
          ),
          drawerLabel: (config) =>
            config.focused ? (
              <Text
                style={[
                  styles.screenTitle,
                  { color: activeTintColor, fontWeight: "bold" },
                ]}
              >
                Home
              </Text>
            ) : (
              <Text style={[styles.screenTitle, { color: "black" }]}>Home</Text>
            ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={MyProfileScreen}
        options={{
          drawerIcon: (config) => (
            <AntDesign name="profile" size={40} color="black" />
          ),
          drawerLabel: (config) =>
            config.focused ? (
              <Text
                style={[
                  styles.screenTitle,
                  { color: activeTintColor, fontWeight: "bold" },
                ]}
              >
                My Profile
              </Text>
            ) : (
              <Text style={[styles.screenTitle, { color: "black" }]}>
                My Profile
              </Text>
            ),
        }}
      />
      <Drawer.Screen
        name="Library"
        component={OtherProfileScreen}
        options={{
          drawerIcon: (config) => (
            <MaterialCommunityIcons name="movie-roll" size={40} color="black" />
          ),
          drawerLabel: (config) =>
            config.focused ? (
              <Text
                style={[
                  styles.screenTitle,
                  { color: activeTintColor, fontWeight: "bold" },
                ]}
              >
                Library
              </Text>
            ) : (
              <Text style={[styles.screenTitle, { color: "black" }]}>
                Library
              </Text>
            ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 25,
    fontFamily: "VarelaRound_400Regular",
    color: "black",
  },
});

export default DrawerNavigator;
