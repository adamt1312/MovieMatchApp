import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { genres } from "../../JSON/genresIDs.json";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserPreferences } from "../../API/firebase/UserMethods/firebaseUserMethods";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import styles from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const iconColor = "rgba(255,255,255,0.6)";

const MyProfileScreen = () => {
  const [nickname, setNickname] = useState(
    firebase.auth().currentUser.displayName
  );
  const [email, setEmail] = useState(firebase.auth().currentUser.email);
  const [emailVerified, setEmailVerified] = useState(
    firebase.auth().currentUser.emailVerified
  );
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
      fetchUserPreferences(firebase.auth().currentUser.uid).then(
        (profilePreferences) => {
          if (profilePreferences.prefered_genres != null) {
            setPreferedGenres(
              getNamesForGenres(profilePreferences.prefered_genres)
            );
          }
          if (!profilePreferences.prefered_release_years != null)
            setpreferedReleaseYears(profilePreferences.prefered_release_years);
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.loadWrapper}>
      {/* <BackgroundBlurred /> */}
      <LinearGradient
        colors={["transparent", "#480048"]}
        locations={[0.1, 1]}
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
            <Text style={styles.nickname}>@{nickname}</Text>
          </View>
          <View style={styles.info}>
            {/* <Text style={styles.title}>Your profile</Text> */}
            <View style={styles.userDetails}>
              <Text style={[styles.nickname, { marginVertical: 10 }]}>
                Basic info
              </Text>
              <View style={styles.row}>
                <MaterialIcons
                  name="email"
                  size={24}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.infoDetail}>{email}</Text>
              </View>
              <View style={styles.row}>
                <Octicons
                  name="verified"
                  size={24}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.infoDetail}>
                  {emailVerified ? "Verified" : "Not verified"}
                </Text>
              </View>
              <Text style={[styles.nickname, { marginVertical: 10 }]}>
                Your preferences
              </Text>

              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="movie-open"
                  size={24}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.infoDetail}>
                  {preferedGenres.toString()}
                </Text>
              </View>
              <View style={styles.row}>
                <Fontisto
                  name="date"
                  size={24}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={styles.infoDetail}>
                  {preferedReleaseYears.toString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MyProfileScreen;
