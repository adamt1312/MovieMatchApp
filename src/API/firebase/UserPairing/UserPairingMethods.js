import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUserNickname } from "../UserMethods/firebaseUserMethods";

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
    const targetUserUid = targetUser.docs.map((doc) => doc.id);
    const currentName = await fetchUserNickname(currentUser.uid);

    db.collection("users")
      .doc(targetUserUid[0])
      .collection("pendingRequests")
      .doc(currentUser.uid)
      .set({
        nickname: currentName,
        uid: currentUser.uid,
      });

    const query2 = await db
      .collection("users")
      .doc(currentUser.uid)
      .update({ sentRequest: targetUserUid[0] });
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
    const result = [];
    const querySnapshot = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("pendingRequests")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
      });
    // console.log(result);
    return result;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function deleteUserRequest(delUserUid) {
  try {
    console.log("deleting pending request of user " + delUserUid);
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const query = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("pendingRequests")
      .doc(delUserUid.toString())
      .delete();
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function setSentRequestFalseOrNull(uid, value) {
  try {
    console.log("seting sent request to false to a user " + uid);
    const db = firebase.firestore();
    const query2 = await db
      .collection("users")
      .doc(uid.toString())
      .update({ sentRequest: value });
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function createNewSession(uid) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    let session_id;
    // creating new session
    await db
      .collection("sessions")
      .add({
        user1: currentUser.uid,
        user2: uid.toString(),
        user1_recommendations: [],
        user2_recommendations: [],
        session_liked_ids: [],
        session_matched_ids: [],
      })
      .then((docRef) => {
        session_id = docRef.id;
      });
    return session_id;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// set isPaired status to both users to created session id
export async function setIsPairedToSessionID(uid, session_id) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    // sets current user
    db.collection("users")
      .doc(currentUser.uid)
      .update({ isPaired: session_id });

    // sets other user
    db.collection("users").doc(uid.toString()).update({ isPaired: session_id });
    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}