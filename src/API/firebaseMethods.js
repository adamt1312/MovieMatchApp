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
    });
    dbCreateLibrary();
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

export async function dbCreateLibrary() {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("library")
      .doc("likedMovies")
      .set({});
    db.collection("users")
      .doc(currentUser.uid)
      .collection("library")
      .doc("dislikedMovies")
      .set({});
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function dbLibraryToLiked(movieObject) {
  try {
    console.log(movieObject.id);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("library")
      .doc("likedMovies")
      .collection(movieObject.id.toString())
      .doc("info")
      .set(movieObject);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function dbLibraryToDisliked(movieObject) {
  try {
    console.log(movieObject.id);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("library")
      .doc("dislikedMovies")
      .collection(movieObject.id.toString())
      .doc("info")
      .set(movieObject);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function fetchAllUsers() {
  try {
    const db = firebase.firestore();
    let users = [];
    const snapshot = await db.collection("users").get(); // should be limited to first n users, e.g. limit(100)
    snapshot.forEach((doc) => {
      users.push({ nickname: doc.data().nickname, id: doc.id });
    });
    return users;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function fetchUser(uid) {
  try {
    const db = firebase.firestore();
    const user = await db.collection("users").doc(uid).get();
    return user.data().nickname;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
