import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import styles from "./Styles";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { fetchUser, fetchUserPendingRequests } from "../../API/firebaseMethods";
import RequestComponent from "../../components/screen components/RequestComponent";
import { isLoading } from "expo-font";
import * as firebase from "firebase";
import "firebase/firestore";

const RequestScreen = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const db = firebase.firestore();
  const doc = db
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("pendingRequests");

  useEffect(() => {
    try {
      // fetch pending requests on mount
      fetchUserPendingRequests().then((data) => {
        setData(data);
        setIsLoading(false);
      });

      //  document listener on PendingRequests collection...when changed, fetch again..
      doc.onSnapshot((doc) => {
        setIsLoading(true);
        fetchUserPendingRequests().then((data) => {
          setData(data);
          setIsLoading(false);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundBlurred />
      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Pairing requests</Text>
          <View style={styles.buttonsView}>
            {/* // TODO: For loop to render multiple components */}
            <RequestComponent name={data[0].nickname} uid={data[0].uid} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default RequestScreen;
