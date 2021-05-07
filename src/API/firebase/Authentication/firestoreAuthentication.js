import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password, nickname, navigation) {
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
    Alert.alert("Error in registration: ", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("Error in signIn: ", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("Error in loggingOut: ", err.message);
  }
}

export async function dbCreateLibrary() {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    // Not necessary to create init in collection, causing problems anyway
    // db.collection("users")
    //   .doc(currentUser.uid)
    //   .collection("likedMovies")
    //   .doc("init")
    //   .set({});
    // db.collection("users")
    //   .doc(currentUser.uid)
    //   .collection("dislikedMovies")
    //   .doc("init")
    //   .set({});

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
    Alert.alert("Error in dbCreateLibrary: ", err.message);
  }
}

// checks whether given nickname is unique
export async function isUniqueNickname(nickname) {
  try {
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("users")
      .where("nickname", "==", nickname)
      .limit(1)
      .get();
    if (querySnapshot.empty) {
      return true;
    } else return false;
  } catch (err) {
    Alert.alert("Error in isUniqueNickname: ", err.message);
  }
}
