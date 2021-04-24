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

    // TODO: For now just merging preferences of both users togehter, result is new preferences object
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

    console.log(sessionPreferences);
    return sessionPreferences;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
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
  session_id
) {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    let pageNum = 1;
    let prefered_genres = "";
    sessionPreferences.prefered_genres.forEach((genre_id) => {
      prefered_genres += genre_id + ",";
    });

    // TODO: Add other query filters e.g. release years
    let query = "&with_genres=" + prefered_genres + "&";
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      keys.tmdbConfig.apiKey +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
      pageNum +
      query;

    // fetch recommend movies
    axios(url).then((data) => {
      // insert data into DB
      console.log(data.data.results);
      db.collection("sessions")
        .doc(session_id)
        .update({ user1_recommendations: data.data.results });
      db.collection("sessions")
        .doc(session_id)
        .update({ user2_recommendations: data.data.results });
    });
    return 1;
  } catch (error) {
    console.log(error);
  }
}
