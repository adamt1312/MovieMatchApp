import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function fetchUserNickname(uid) {
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

export async function dbLibraryToLiked(movieObject) {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    // delete from disliked (if exist)
    db.collection("users")
      .doc(currentUser.uid)
      .collection("dislikedMovies")
      .doc(movieObject.id.toString())
      .delete();

    // add to liked
    db.collection("users")
      .doc(currentUser.uid)
      .collection("likedMovies")
      .doc(movieObject.id.toString())
      .set(movieObject);

    // insert movie genres to liked genres, and compute 3 most prefered genres...
    updateLikedGenresCounter(movieObject).then(() => {
      updatePreferedGenres();
    });
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function dbLibraryToDisliked(movieObject) {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    // delete from liked (if exist)
    db.collection("users")
      .doc(currentUser.uid)
      .collection("likedMovies")
      .doc(movieObject.id.toString())
      .delete();

    // add to disliked
    db.collection("users")
      .doc(currentUser.uid)
      .collection("dislikedMovies")
      .doc(movieObject.id.toString())
      .set(movieObject);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// update liked genres field in db, which counts how many times a specific genre was liked...
export async function updateLikedGenresCounter(movieObject) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    movieObject.genre_ids.forEach((genre_id) => {
      let gid = "liked_genres." + genre_id;
      let obj = {};
      obj[gid] = firebase.firestore.FieldValue.increment(1);
      db.collection("users")
        .doc(currentUser.uid)
        .collection("preferencesProfile")
        .doc("like")
        .update(obj);
    });

    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

// TODO: Not sure if to use this
export async function updateUserDislikedGenres(movieObject) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    movieObject.genre_ids.forEach((genre_id) => {
      let gid = "disliked_genres." + genre_id;
      let obj = {};
      obj[gid] = firebase.firestore.FieldValue.increment(1);
      db.collection("users")
        .doc(currentUser.uid)
        .collection("preferencesProfile")
        .doc("dislike")
        .update(obj);
    });

    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function updatePreferedGenres() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    const liked_doc = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("preferencesProfile")
      .doc("like")
      .get();

    const liked_genres_obj = liked_doc.data().liked_genres;
    console.log(liked_genres_obj);
    let favoriteGenres = [];
    for (let i = 0; i < 3; i++) {
      let arr = Object.values(liked_genres_obj);
      let maxValue = Math.max(...arr);
      let keyMaxValue = getKeyByValue(liked_genres_obj, maxValue);
      favoriteGenres.push(keyMaxValue);
      console.log("Key for max value is: " + keyMaxValue);
      delete liked_genres_obj[keyMaxValue];
      console.log(favoriteGenres);
    }

    db.collection("users")
      .doc(currentUser.uid)
      .collection("preferencesProfile")
      .doc("like")
      .update({ prefered_genres: favoriteGenres });

    return 1;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
