import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import BackgroundBlurred from "../Components/BackgroundBlurred";
import ButtonComponent from "../Components/Screen components/ButtonComponent";
import * as firebase from "firebase";
import { loggingOut } from "../API/firebaseMethods";

const fetchFont = () => {
  return Font.loadAsync({
    ChaletNewYorkNineteenSeventy: require("../assets/fonts/ChaletNewYorkNineteenSeventy.ttf"),
  });
};

export default function homeScreen({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setNickname(dataObj.nickname);
      }
    }
    getUserInfo();
  });

  const handlePress = () => {
    loggingOut();
    navigation.replace("SignIn");
  };
  return (
    <View style={styles.screenView}>
      <BackgroundBlurred />
      <View
        style={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, color: "white" }}>
          {"Hi " + nickname + " !"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: "green",
          height: 200,
          width: 200,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
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
