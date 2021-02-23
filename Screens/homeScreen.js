import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import BackgroundBlurred from "../components/BackgroundBlurred";
import * as firebase from "firebase";
import { loggingOut } from "../API/firebaseMethods";
import { Button } from "galio-framework";

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

  const handleLogOut = () => {
    loggingOut();
    navigation.replace("SignIn");
  };
  return (
    <View style={styles.screenView}>
      <BackgroundBlurred />
      <View style={styles.contentWrapper}>
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontFamily: "VarelaRound_400Regular",
          }}
        >
          {"Welcome back, " + nickname + " !"}
        </Text>
      </View>
      <View style={[styles.contentWrapper, { flex: 2 }]}>
        <Button
          onPress={() => {
            navigation.replace("ExploreMovies");
          }}
          style={styles.button}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 20,
              fontFamily: "Roboto_300Light",
            }}
          >
            Explore movies
          </Text>
        </Button>
        <Button onPress={handleLogOut} style={styles.button}>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 25,
              fontFamily: "Roboto_300Light",
            }}
          >
            Log Out
          </Text>
        </Button>
      </View>
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
  contentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 5,
  },
  card: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
  },
  button: {
    width: "50%",
    backgroundColor: "white",
  },
});
