import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUser } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";
import { setIsPairedToValue } from "../UserPairing/UserPairingMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";

// fetch user session and returns array with recommendations and session_id
export async function fetchUserSessionRecommendations() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    let userData = await fetchUser(currentUser.uid);
    let arr = [];
    if (userData.isPaired) {
      const session = await db
        .collection("sessions")
        .doc(userData.isPaired)
        .collection(currentUser.uid)
        .get();
      arr.push(session.docs.map((doc) => doc.data()));
      arr.push(userData.isPaired);
    } else {
      arr = false;
    }
    return arr;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// returns an object where movieId => data pairs are for the user
export async function getCorrectRecommendData(data) {
  try {
    const currentUserUID = await firebase.auth().currentUser.uid;
    return data;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// push movie id to DB into session_liked_ids array
export async function sessionMovieLike(movie_id, session_id) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    db.collection("sessions")
      .doc(session_id)
      .update({
        session_liked_ids: firebase.firestore.FieldValue.arrayUnion(movie_id),
      });
    db.collection("sessions")
      .doc(session_id.toString())
      .collection(currentUser.uid.toString())
      .doc(movie_id.toString())
      .delete();
    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// remove movie doc from recommended movies collection of the user in DB
export async function sessionMovieDislike(movie_id, session_id) {
  try {
    const db = firebase.firestore();
    const currentUser = await firebase.auth().currentUser;
    db.collection("sessions")
      .doc(session_id.toString())
      .collection(currentUser.uid.toString())
      .doc(movie_id.toString())
      .delete();
    return 1;
  } catch (err) {
    Alert.alert("sessionMovieDislike error: !", err.message);
  }
}

// fetch more movies from an TMDb API when one of the users swipedAll
// TODO: get page num from asynstorage and ++ then set ++
export async function fetchMoreMovies() {
  try {
    const db = firebase.firestore();
    const currentUser = await firebase.auth().currentUser;
    db.collection("sessions")
      .doc(session_id.toString())
      .collection(currentUser.uid.toString())
      .doc(movie_id.toString())
      .delete();
    return 1;
  } catch (err) {
    Alert.alert("sessionMovieDislike error: !", err.message);
  }
}

// ends current session of user, and removes it in DB
export async function endSession() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const userDoc = await db.collection("users").doc(currentUser.uid).get();

    const sessionDoc = await db
      .collection("sessions")
      .doc(userDoc.data().isPaired)
      .get();

    // remove session from collection
    db.collection("sessions").doc(userDoc.data().isPaired).delete();

    if (currentUser.uid == sessionDoc.data().user1) {
      // sets isPaired to null to both users
      setIsPairedToValue(sessionDoc.data().user2, null);
    } else {
      // sets isPaired to null to both users
      setIsPairedToValue(sessionDoc.data().user1, null);
    }
    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
