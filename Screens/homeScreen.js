import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import BackgroundBlurred from "../Components/BackgroundBlurred";
import ButtonComponent from "../Components/Screen components/ButtonComponent";

const fetchFont = () => {
  return Font.loadAsync({
    ChaletNewYorkNineteenSeventy: require("../assets/fonts/ChaletNewYorkNineteenSeventy.ttf"),
  });
};

const homeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screenView}>
      <BackgroundBlurred />
      {/* <StatusBar backgroundColor='#1d0014' barStyle='light-content' /> */}
      <Text style={styles.appName}>MOVIE TINDER</Text>
      <View style={styles.buttonContainer}>
        <ButtonComponent />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    borderWidth: 20,
    borderColor: "red",
  },
  appName: {
    color: "white",
    fontSize: 43,
    borderBottomWidth: 5,
    fontFamily: "ChaletNewYorkNineteenSeventy",
    borderBottomColor: "#491475",
    position: "absolute",
    top: 20,
  },
  buttonContainer: {
    position: "absolute",
    top: "40%",
  },
});

export default homeScreen;
