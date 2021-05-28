import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as firebase from "firebase";
import { isNewUser } from "../../API/firebase/UserMethods/firebaseUserMethods";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const newUser = await isNewUser();
        // if new user -> show app intro
        if (newUser) {
          navigation.replace("AppIntroScreen");
        } else {
          navigation.replace("Home");
        }
      } else {
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
