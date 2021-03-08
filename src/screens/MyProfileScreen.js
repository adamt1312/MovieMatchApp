import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { fetchUser } from "../API/firebaseMethods";
import { FontAwesome } from "@expo/vector-icons";

const MyProfileScreen = () => {
  const [nickname, setNickname] = useState("null");
  useEffect(() => {
    try {
      fetchUser(firebase.auth().currentUser.uid).then((nickname) => {
        setNickname(nickname);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={100} color="black" />
      <Text style={styles.title}>
        {"Hey " + nickname + ". This is your profile screen."}
      </Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 35,
    color: "black",
  },
});

export default MyProfileScreen;
