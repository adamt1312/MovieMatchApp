import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { fetchUser } from "../UserMethods/firebaseUserMethods";
import keys from "../../../../config/keys";

export async function fetchUserSession() {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    let userData = await fetchUser(currentUser.uid);
    const session = await db
      .collection("sessions")
      .doc(userData.isPaired)
      .get();
    let data = session.data();
    return data;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function getCorrectRecommendData(data) {
  try {
    let correct_data;
    if (data.user1 == firebase.auth().currentUser.uid) {
      correct_data = data.user1_recommendations;
    } else {
      correct_data = data.user2_recommendations;
    }
    return correct_data;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
