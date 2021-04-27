import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUser } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";

export async function fetchUserSession() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    let userData = await fetchUser(currentUser.uid);
    const session = await db
      .collection("sessions")
      .doc(userData.isPaired)
      .get();
    let data = session.data();
    return data;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// returns an object where movieId => data pairs are for the user
export async function getCorrectRecommendData(data) {
  try {
    const currentUserUID = await firebase.auth().currentUser.uid;
    return data.currentUserUID;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function likeMovieInSession(movie_id, session_id) {
  try {
    const db = firebase.firestore();
    db.collection("sessions")
      .doc(session_id)
      .update({ session_liked_ids: movie_id });
    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
