import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUserPreferences } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";

export async function generatePreferencesForSession(
  second_user_uid,
  session_id
) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    const preferencesProfile1 = await fetchUserPreferences(
      firebase.auth().currentUser.uid
    );
    const preferencesProfile2 = await fetchUserPreferences(second_user_uid);

    // Merging preferences of both users togehter, result is a new preferences object
    let sessionPreferences = {
      prefered_genres: merge2arrays_RemoveDuplicates(
        preferencesProfile1.prefered_genres.concat(
          preferencesProfile2.prefered_genres
        )
      ),
      prefered_release_years: merge2arrays_RemoveDuplicates(
        preferencesProfile1.prefered_release_years.concat(
          preferencesProfile2.prefered_release_years
        )
      ),
    };

    // send preferences to DB, not sure if necessary
    await db.collection("sessions").doc(session_id).update({
      session_preferences: sessionPreferences,
    });

    return sessionPreferences;
  } catch (err) {
    Alert.alert("Error in generatePreferencesForSession: ", err.message);
  }
}

const merge2arrays_RemoveDuplicates = (array) => {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
};

export async function generateRecommendationsForSession(
  sessionPreferences,
  session_id,
  other_user_uid,
  pageNum
) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    let prefered_genres = "";
    sessionPreferences.prefered_genres.forEach((genre_id) => {
      prefered_genres += genre_id + "|";
    });

    // TODO: Future improvements cann add more query filters e.g. directors, actors etc...
    let query = "&with_genres=" + prefered_genres + "&";
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      keys.tmdbConfig.apiKey +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
      pageNum +
      query;

    // fetch recommend movies
    await axios(url).then((data) => {
      // insert data into DB as a subcollection for session named "user_uid" containing recommended movie objects as docs for each user
      data.data.results.forEach(async (movie) => {
        await db
          .collection("sessions")
          .doc(session_id)
          .collection("allRecommended")
          .doc(movie.id.toString())
          .set(movie);
        await db
          .collection("sessions")
          .doc(session_id)
          .collection(currentUser.uid)
          .doc(movie.id.toString())
          .set(movie);
        await db
          .collection("sessions")
          .doc(session_id)
          .collection(other_user_uid)
          .doc(movie.id.toString())
          .set(movie);
      });
    });
    return 1;
  } catch (error) {
    console.log(error);
  }
}
