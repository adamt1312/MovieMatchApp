import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUser } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";

// fetch user session
export async function fetchUserSessionRecommendations() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    let userData = await fetchUser(currentUser.uid);
    const session = await db
      .collection("sessions")
      .doc(userData.isPaired)
      .collection(currentUser.uid)
      .get();
    return session.docs.map((doc) => doc.data());
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

export async function sessionMovieLike(movie) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    await db.collection("sessions").doc(userData.isPaired).get();
    let data = session.data();
    return data;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function sessionMovieDislike(movie) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    await db.collection("sessions").doc(userData.isPaired).get();
    let data = session.data();
    return data;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
