import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUserNickname } from "../UserMethods/firebaseUserMethods";

// checks whether user with given nickname exist
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
    Alert.alert("Error in isExistingUser: ", err.message);
  }
}

// checks whether is user is paired: YES -> returns the id of the other user | NO -> returns null;
export async function isUserPaired(nickname) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const user = await db
      .collection("users")
      .where("nickname", "==", nickname)
      .get();
    if (user.empty) {
      console.log("User doesn`t exist.");
      return -1;
    }
    let isPaired;
    user.forEach((doc) => {
      isPaired = doc.data().isPaired;
    });
    if (isPaired) {
      const session = await db.collection("sessions").doc(isPaired).get();
      if (session.data().user1 != currentUser.uid) {
        return session.data().user1;
      } else if (session.data().user2 != currentUser.uid) {
        return session.data().user2;
      }
    } else {
      return isPaired;
    }
  } catch (err) {
    Alert.alert("Error in isUserPaired: ", err.message);
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
    Alert.alert("Error in setSentRequest: ", err.message);
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
    Alert.alert("Error in getSentRequest: ", err.message);
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
    return result;
  } catch (err) {
    Alert.alert("Error in fetchUserPendingRequests: ", err.message);
  }
}

export async function deleteUserRequest(delUserUid) {
  try {
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
    Alert.alert("Error in deleteUserRequest: ", err.message);
  }
}

export async function setSentRequestFalseOrNull(uid, value) {
  try {
    const db = firebase.firestore();
    const query2 = await db
      .collection("users")
      .doc(uid.toString())
      .update({ sentRequest: value });
    return true;
  } catch (err) {
    Alert.alert("Error in setSentRequestFalseOrNull: ", err.message);
  }
}

// create a new session in a DB
export async function createNewSession(other_user_uid) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    let session_id;
    // creating new session
    await db
      .collection("sessions")
      .add({
        user1: currentUser.uid,
        user2: other_user_uid,
        session_liked_ids: [],
        pageNum: 1,
      })
      .then((docRef) => {
        session_id = docRef.id;
      });

    return session_id;
  } catch (err) {
    Alert.alert("Error in createNewSession: ", err.message);
  }
}

// set isPaired status to both users to created session id
export async function setIsPairedToValue(other_user_uid, value) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    // sets current user
    db.collection("users").doc(currentUser.uid).update({ isPaired: value });

    // sets other user
    db.collection("users")
      .doc(other_user_uid.toString())
      .update({ isPaired: value });
    return 1;
  } catch (err) {
    Alert.alert("Error in setIsPairedToValue: ", err.message);
  }
}

// cancel sent request (sentRequest to null, delete doc in pendingRequests)
export async function cancelSentRequest() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    // fetch current user doc
    let currentUserDoc = await db
      .collection("users")
      .doc(currentUser.uid)
      .get();

    // delete pendingRequest doc in collection
    await db
      .collection("users")
      .doc(currentUserDoc.data().sentRequest)
      .collection("pendingRequests")
      .doc(currentUser.uid)
      .delete();

    // sets other user
    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({ sentRequest: null });
    return 1;
  } catch (err) {
    Alert.alert("Error in setIsPairedToValue: ", err.message);
  }
}
