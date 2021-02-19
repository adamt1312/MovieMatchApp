import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as firebase from "firebase";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Going to HomeScreen");
        navigation.replace("HomeScreen");
      } else {
        console.log("Going to SignInScreen");
        navigation.replace("SignIn");
      }
    });
  });

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
