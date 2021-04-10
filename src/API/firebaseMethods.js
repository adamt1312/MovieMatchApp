import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

// const db = firebase.firestore();

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
    currentUser.updateProfile({ displayName: nickname });
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

export async function isExistingUser(nickname) {
  try {
    const db = firebase.firestore();
    const user = await db
      .collection("users")
      .where("nickname", "==", nickname)
      .get();
    if (user.empty) {
      console.log("User doesn`t exist.");
      return false;
    } else {
      return user;
    }
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
      console.log("User doesn`t exist.");
      return -1;
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

export async function setSentRequest(nickname) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const targetUser = await db
      .collection("users")
      .where("nickname", "==", nickname)
      .get();
    const docId = targetUser.docs.map((doc) => doc.id);
    const currentName = await fetchUser(currentUser.uid);

    db.collection("users")
      .doc(docId[0])
      .collection("pendingRequests")
      .doc(currentUser.uid)
      .set({
        nickname: currentName,
        uid: currentUser.uid,
      });

    const query2 = await db
      .collection("users")
      .doc(currentUser.uid)
      .update({ sentRequest: docId[0] });
    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function getSentRequest() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query = await db.collection("users").doc(currentUser.uid).get();
    const data = query.data();
    return data.sentRequest;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function fetchUserPendingRequests() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const querySnapshot = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("pendingRequests")
      .get();
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// FIXME: Check this, looks like it does not delete user in DB
export async function deleteUserRequest(delUserUid) {
  try {
    console.log("delete user function called" + delUserUid);
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("pendingRequests")
      .doc(delUserUid)
      .delete();
    return true;
  } catch (error) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// Should be okay and working
export async function setSentRequestFalseOrNull(uid, value) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query2 = await db
      .collection("users")
      .doc(uid)
      .update({ sentRequest: value });
    return true;
  } catch (error) {
    Alert.alert("There is something wrong!", err.message);
  }
}
