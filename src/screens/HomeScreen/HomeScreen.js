import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import "react-native-gesture-handler";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import * as firebase from "firebase";
import { loggingOut } from "../../API/firebaseMethods";
import { Button } from "galio-framework";
import styles from "./Styles";
import { Entypo } from "@expo/vector-icons";

const homeScreen = ({ navigation }) => {
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
  }, []);

  const handleLogOut = () => {
    loggingOut();
    navigation.replace("SignIn");
  };
  return (
    <View style={styles.screenView}>
      <BackgroundBlurred />

      <View style={styles.contentWrapper}>
        <View style={styles.iconWrapper}>
          <Entypo
            name="menu"
            size={45}
            color="white"
            iconStyle={{ color: "red" }}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </View>
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
            // navigation.replace("ExploreMovies");
            navigation.replace("BottomTabNavigator");
          }}
          style={styles.button}
        >
          <Text style={styles.btnTitle}>Explore movies</Text>
        </Button>
        <Button onPress={handleLogOut} style={styles.button}>
          <Text style={styles.btnTitle}>Log Out</Text>
        </Button>
      </View>
    </View>
  );
};

export default homeScreen;
