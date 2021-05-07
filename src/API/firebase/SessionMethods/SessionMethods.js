import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUser } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";
import { setIsPairedToValue } from "../UserPairing/UserPairingMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateRecommendationsForSession } from "../UserPairing/RecommendationsLogic";

// fetch user session and returns array with recommendations and session_id (when movie liked/disliked, is removed from this)
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
    Alert.alert("fetchUserSessionRecommendations error: ", err.message);
  }
}

// return all session recommendations and matched ids
export async function fetchSessionRecommendations() {
  try {
    const db = firebase.firestore();
    let session_id = await AsyncStorage.getItem("session_id");
    let arr = [];
    if (session_id) {
      // gets all recommends for a session with removals
      const allRecommended = await db
        .collection("sessions")
        .doc(session_id)
        .collection("allRecommended")
        .get();
      arr.push(allRecommended.docs.map((doc) => doc.data()));

      const sessionDoc = await db.collection("sessions").doc(session_id).get();
      let session_liked_ids = sessionDoc.data().session_liked_ids;
      let matchedIds = findDuplicates(session_liked_ids);
      arr.push(matchedIds);
    } else {
      arr = false;
    }
    return arr;
  } catch (err) {
    Alert.alert("fetchSessionRecommendations error: ", err.message);
  }
}

// check whether there are matched movies between users in a session
// export async function findingMatchedMovies(sid) {
//   try {
//     const db = firebase.firestore();
//     const doc = await db.collection("sessions").doc(sid.toString()).get();
//     let likedIds = doc.data().session_liked_ids;

//     let matchedIds = findDuplicates(likedIds);

//     return matchedIds;
//   } catch (err) {
//     Alert.alert("findingMatchedMovies error: ", err);
//   }
// }

// finds duplicates in an array
const findDuplicates = (arr) => {
  return Array.from(new Set(arr)).filter(
    (value) => arr.indexOf(value) !== arr.lastIndexOf(value)
  );
};

// returns an object where movieId => data pairs are for the user
export async function getCorrectRecommendData(data) {
  try {
    const currentUserUID = await firebase.auth().currentUser.uid;
    return data;
  } catch (err) {
    Alert.alert("getCorrectRecommendData error: ", err.message);
  }
}

// push movie id to DB into session_liked_ids array
export async function sessionMovieLike(movie_id, session_id) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    // array must be fetched first, then pushed new id, then set to the DB again (dumb API, omfg)
    const doc = await db.collection("sessions").doc(session_id).get();
    const likedIds = doc.data().session_liked_ids;
    likedIds.push(movie_id);
    db.collection("sessions").doc(session_id).update({
      session_liked_ids: likedIds,
    });

    db.collection("sessions")
      .doc(session_id.toString())
      .collection(currentUser.uid.toString())
      .doc(movie_id.toString())
      .delete();
    return 1;
  } catch (err) {
    Alert.alert("sessionMovieLike error: ", err.message);
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
    Alert.alert("sessionMovieDislike error: ", err.message);
  }
}

// fetch more movies from an TMDb API when one of the users swipedAll
export async function generateRecommendedNextPageNum() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const session_id = await AsyncStorage.getItem("session_id");
    // fetch session doc
    const sessionDoc = await db
      .collection("sessions")
      .doc(session_id.toString())
      .get();

    let sessionPreferences = sessionDoc.data().session_preferences;
    let other_user_uid =
      sessionDoc.data().user1 == currentUser.uid
        ? sessionDoc.data().user2
        : sessionDoc.data().user1;
    let pageNum = sessionDoc.data().pageNum;

    // generate recommendations with next pageNum
    await generateRecommendationsForSession(
      sessionPreferences,
      session_id.toString(),
      other_user_uid,
      ++pageNum
    );
    db.collection("sessions")
      .doc(session_id.toString())
      .update({
        pageNum: firebase.firestore.FieldValue.increment(1),
      });
    return 1;
  } catch (err) {
    Alert.alert("fetchMoreMovies error: !", err.message);
  }
}

// ends current session of user, and removes it in DB
export async function endSession() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUserDoc = await db
      .collection("users")
      .doc(currentUser.uid)
      .get();

    const sessionDoc = await db
      .collection("sessions")
      .doc(currentUserDoc.data().isPaired)
      .get();

    // remove session from collection
    db.collection("sessions").doc(currentUserDoc.data().isPaired).delete();

    if (currentUser.uid == sessionDoc.data().user1) {
      // sets isPaired to null to both users
      await setIsPairedToValue(sessionDoc.data().user2, null);
    } else {
      // sets isPaired to null to both users
      await setIsPairedToValue(sessionDoc.data().user1, null);
    }
    return 1;
  } catch (err) {
    Alert.alert("endSession error: ", err.message);
  }
}
