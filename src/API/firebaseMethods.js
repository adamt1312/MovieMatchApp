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
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function dbLibraryToLiked(movieObject) {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("likedMovies")
      .doc(movieObject.id.toString())
      .set(movieObject);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function dbLibraryToDisliked(movieObject) {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .collection("dislikedMovies")
      .doc(movieObject.id.toString())
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

export async function fetchUserLikedMovies() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const movies = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("likedMovies")
      .get();
    return movies.docs.map((doc) => doc.data());
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function fetchUserDislikedMovies() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const movies = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("dislikedMovies")
      .get();
    return movies.docs.map((doc) => doc.data());
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function isUserPaired(nickname) {
  try {
    const db = firebase.firestore();
    // TODO: Add check if user is not trying to pair to himself
    // const currentUserNickname = await db
    //   .collection("users")
    //   .doc(firebase.auth().currentUser.uid)
    //   .get();
    // console.log(currentUserNickname);
    // console.log(firebase.auth().currentUser.uid);

    const user = await db
      .collection("users")
      .where("nickname", "==", nickname)
      .get();
    if (user.empty) {
      console.log("No matching documents.");
      return;
    }
    let b;
    user.forEach((doc) => {
      b = doc.data().isPaired;
    });
    return b;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function setPendingRequest(nickname) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const movies = await db
      .collection("users")
      .doc(currentUser.uid)
      .update({ sentRequest: nickname });
    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
