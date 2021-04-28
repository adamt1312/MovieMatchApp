import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUser } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";

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

export async function fetchUserRecommendedMovies() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const movies = await db.collection("sessions").doc(userData.isPaired).get();
    let data = session.data();
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
    Alert.alert("There is something wrong!", err.message);
  }
}
