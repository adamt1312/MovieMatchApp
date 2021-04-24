import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { genres } from "../../JSON/genresIDs.json";
import { LinearGradient } from "expo-linear-gradient";

import {
  fetchUserNickname,
  fetchUserPreferences,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundBlurred from "../../components/BackgroundBlurred";

const MyProfileScreen = () => {
  const [nickname, setNickname] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferedGenres, setPreferedGenres] = useState("none");
  const [preferedReleaseYears, setpreferedReleaseYears] = useState("none");

  const getNamesForGenres = (genres_ids) => {
    let genres_names = [];
    genres_ids.forEach((genre_id) => {
      genres.forEach((genre) => {
        if (genre.id.toString() == genre_id) {
          genres_names.push(genre.name);
        }
      });
    });
    return genres_names;
  };

  useEffect(() => {
    try {
      console.log("UE");
      fetchUserPreferences(firebase.auth().currentUser.uid).then(
        (profilePreferences) => {
          console.log(profilePreferences.prefered_genres);
          if (profilePreferences.prefered_genres != null) {
            console.log(profilePreferences.prefered_genres);
            setPreferedGenres(
              getNamesForGenres(profilePreferences.prefered_genres)
            );
          }
          if (!profilePreferences.prefered_release_years != null)
            setpreferedReleaseYears(profilePreferences.prefered_release_years);
          setIsLoading(false);
        }
      );
      fetchUserNickname(firebase.auth().currentUser.uid).then((nickname) => {
        setNickname(nickname);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.loadWrapper}>
      <BackgroundBlurred />
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.5)"]}
        locations={[0.1, 0.4]}
        start={[0.1, 0.2]}
        end={{ x: 0, y: 1 }}
        style={styles.linearGradient}
      />
      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.avatar}>
            <FontAwesome name="user-circle" size={100} color="white" />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>Your profile</Text>
            <View style={styles.userDetails}>
              <Text style={styles.infoDetail}>{"Nickname: " + nickname}</Text>
              <Text style={styles.infoDetail}>
                {"Email: " + firebase.auth().currentUser.email}
              </Text>
              <Text style={styles.infoDetail}>
                {"Prefered Genres: " + preferedGenres.toString()}
              </Text>
              <Text style={styles.infoDetail}>
                {"Prefered release years: " + preferedReleaseYears.toString()}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 35,
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "VarelaRound_400Regular",
    marginBottom: 10,
  },
  loadWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    height: "60%",
    width: "100%",
  },
  avatar: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  userDetails: {
    marginHorizontal: 25,
  },
  infoDetail: {
    fontSize: 16,
    fontFamily: "VarelaRound_400Regular",
    marginVertical: 5,
  },
  linearGradient: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
});

export default MyProfileScreen;
