import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password, nickname) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickname: nickname,
      isPaired: null,
      sentRequest: null,
    });
    currentUser.updateProfile({ displayName: nickname, email: email });
    dbCreateLibrary();
    // TODO: just uncomment
    // currentUser.sendEmailVerification();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// TODO: Delete init, cause failing of other components...
export async function dbCreateLibrary() {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("likedMovies")
      .doc("init")
      .set({});
    db.collection("users")
      .doc(currentUser.uid)
      .collection("dislikedMovies")
      .doc("init")
      .set({});
    db.collection("users")
      .doc(currentUser.uid)
      .collection("pendingRequests")
      .doc("init")
      .set({});
    db.collection("users")
      .doc(currentUser.uid)
      .collection("pendingRequests")
      .doc("init")
      .set({});
    db.collection("users")
      .doc(currentUser.uid)
      .collection("preferencesProfile")
      .doc("like")
      .set({
        liked_genres: null,
        liked_release_years: null,
        prefered_genres: null,
        prefered_release_years: null,
      });
    db.collection("users")
      .doc(currentUser.uid)
      .collection("preferencesProfile")
      .doc("dislike")
      .set({});
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
