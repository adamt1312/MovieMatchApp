import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
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
          <View style={styles.menuMsgWrapper}>
            <View style={styles.iconWrapper}>
              <Entypo
                name="menu"
                size={45}
                color="white"
                iconStyle={{ color: "red" }}
                style={{ padding: 0 }}
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.welcomeMsg}>
                {"Welcome back, " + nickname + " !"}
              </Text>
              <Text style={styles.statusMsg}>CURRENT STATUS</Text>
              <Text style={styles.pairedText}>
                {isPaired ? "Paired with " + isPaired : "You are free to pair"}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title={"Explore Movies"}
              onPress={() => navigation.replace("BottomTabNavigator")}
              width={"55%"}
            />
            <ButtonComponent
              title={"Session"}
              onPress={() => {
                navigation.replace("SessionTabNavigator");
              }}
              width={"55%"}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default homeScreen;
