import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import * as firebase from "firebase";
import { loggingOut } from "../../API/firebase/Authentication/firestoreAuthentication";
import styles from "./Styles";
import { Entypo } from "@expo/vector-icons";
import ButtonComponent from "../../components/screen components/ButtonComponent";
import { isUserPaired } from "../../API/firebase/UserPairing/UserPairingMethods";
import { fetchUserNickname } from "../../API/firebase/UserMethods/firebaseUserMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";

const homeScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState(
    firebase.auth().currentUser.displayName
  );
  const [isPaired, setIsPaired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // handle current status on mount
  useEffect(() => {
    isUserPaired(nickname).then((fetchedUid) => {
      if (fetchedUid) {
        fetchUserNickname(fetchedUid).then((fetchedNickname) => {
          AsyncStorage.setItem("pairedToUser", fetchedNickname);
          setIsPaired(fetchedNickname);
        });
      } else {
        console.log("sid to empty");
        AsyncStorage.setItem("pairedToUser", "");
        AsyncStorage.setItem("session_id", "");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.screenView}>
      <BackgroundBlurred />
      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <>
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
            <View
              style={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.1)",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  fontFamily: "VarelaRound_400Regular",
                  textAlign: "center",
                  margin: 15,
                }}
              >
                {"Welcome back, " + nickname + " !"}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily: "VarelaRound_400Regular",
                  textAlign: "center",
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                CURRENT STATUS
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontFamily: "VarelaRound_400Regular",
                  textAlign: "center",
                }}
              >
                {isPaired ? "Paired with " + isPaired : "You are free to pair"}
              </Text>
            </View>
          </View>
          <View style={[styles.contentWrapper, { flex: 2 }]}>
            <ButtonComponent
              title={"Explore Movies"}
              onPress={() => {
                navigation.replace("BottomTabNavigator");
              }}
            />
            <ButtonComponent
              title={"Session"}
              onPress={() => {
                navigation.replace("SessionTabNavigator");
              }}
            />
            <ButtonComponent title={"Log Out"} onPress={loggingOut} />
          </View>
        </>
      )}
    </View>
  );
};

export default homeScreen;
