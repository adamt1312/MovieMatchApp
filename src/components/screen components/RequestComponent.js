import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  deleteUserRequest,
  setSentRequestFalseOrNull,
  createNewSession,
  setIsPairedToSessionID,
  setUserLikedGenresIds,
} from "../../API/firebase/UserPairing/UserPairingMethods";
import {
  updatePreferedGenres,
  updatePreferedReleaseYears,
} from "../../API/firebase/UserMethods/firebaseUserMethods";

const RequestComponent = (props) => {
  const { name, uid } = props;

  // TODO: 1. delete pendingRequest ✓
  //       2. set isPaired to session uid, ✓
  //       3. set sentRequest to null ✓
  //       3. hide waiting message in FindMatchScreen...
  const acceptUserHandler = async () => {
    // deleteUserRequest(uid);
    // setSentRequestFalseOrNull(uid, null).then(() => {
    //   createNewSession(uid).then((session_id) => {
    //     setIsPairedToSessionID(uid, session_id);
    //   });
    // });
    // const test = fetchUserLikedMovies().then((likedMovies) => {
    //   likedMovies.forEach((movie) => {
    //     console.log(movie.genre_ids);
    //   });
    // });

    ////// JUST TESTING FUNCTIONS //////
    updatePreferedGenres();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: 1. delete pendingRequest ✓
  //       2. set sentRequest to false ✓
  //       2. show deny message modal in FindMatchScreen... ✓

  const denyUserHandler = () => {
    try {
      deleteUserRequest(uid);
      setSentRequestFalseOrNull(uid, false).then(() => {
        console.log("user request" + uid + "deleted");
      });
    } catch (error) {
      console.log(error);
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
