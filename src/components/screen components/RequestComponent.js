import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  deleteUserRequest,
  setSentRequestFalseOrNull,
  createNewSession,
  setIsPairedToValue,
  setUserLikedGenresIds,
} from "../../API/firebase/UserPairing/UserPairingMethods";
import {
  updatePreferedGenres,
  updatePreferedReleaseYears,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import {
  generateRecommendationsForSession,
  generatePreferencesForSession,
} from "../../API/firebase/UserPairing/RecommendationsLogic";
import keys from "../../../config/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RequestComponent = (props) => {
  const { name, uid } = props;

  const acceptUserHandler = async () => {
    try {
      deleteUserRequest(uid);
      setSentRequestFalseOrNull(uid, null).then(() => {
        createNewSession(uid).then((session_id) => {
          setIsPairedToValue(uid, session_id);
          generatePreferencesForSession(uid, session_id).then(
            (sessionPreferences) => {
              generateRecommendationsForSession(
                sessionPreferences,
                session_id,
                uid,
                1
              );
            }
          );
        });
      });
    } catch (error) {
      console.log("acceptUserHandler: " + error);
    }
  };

  const denyUserHandler = () => {
    try {
      deleteUserRequest(uid);
      setSentRequestFalseOrNull(uid, false).then(() => {});
    } catch (error) {
      console.log("denyUserHandler: " + error);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity
          onPress={() => {
            acceptUserHandler();
          }}
        >
          <FontAwesome5
            name="user-check"
            size={30}
            color="green"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            denyUserHandler();
          }}
        >
          <FontAwesome5
            name="user-times"
            size={30}
            color="red"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 15,
    width: "90%",
    height: 70,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  title: {
    fontFamily: "VarelaRound_400Regular",
    fontSize: 25,
    color: "black",
    marginLeft: 25,
  },
  titleWrapper: {
    flex: 1,
    // backgroundColor: "red",
  },
  iconsWrapper: {
    flexDirection: "row",
    // backgroundColor: "blue",
    width: "45%",
    justifyContent: "space-evenly",
  },
  icon: {
    shadowColor: "black",
    shadowRadius: 5,
    // shadowOffset: {
    //   width: 1, // Same rules apply from above
    //   height: 1, // Can't both be 0
    // },
  },
});

export default RequestComponent;
