import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import styles from "./Styles";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { fetchUserPendingRequests } from "../../API/firebase/UserPairing/UserPairingMethods";
import RequestComponent from "../../components/screen components/RequestComponent";
import { isLoading } from "expo-font";
import * as firebase from "firebase";
import "firebase/firestore";
import { Swing } from "react-native-animated-spinkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: 1. Add cancel request
//       2. disable user to accept/deny requests when paired (trough async storage get item pairedtouser...)
const RequestScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(null);
  const [inSession, setInSession] = useState(false);

  const db = firebase.firestore();

  useEffect(() => {
    try {
      AsyncStorage.getItem("session_id").then((sid) => {
        console.log("sid", sid);
        if (sid !== null) {
          setInSession(true);
        }
        //  document listener on PendingRequests collection...when changed, fetch again..
        let unsubscribe = db
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("pendingRequests")
          .onSnapshot(() => {
            setIsLoading(true);
            fetchUserPendingRequests().then((data) => {
              setData(data);
              if (JSON.stringify(data.length) == 1) {
                setIsEmpty(true);
              } else {
                setIsEmpty(false);
              }
              setIsLoading(false);
            });
          });
        return function cleanup() {
          unsubscribe();
        };
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
      ) : inSession ? (
        <>
          <Swing size={100} color="#FFF" />
          <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>
            You are currently in session and unable to handle requests.
          </Text>
        </>
      ) : (
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Pairing requests</Text>
          {isEmpty ? (
            <View style={styles.emptyView}>
              <Text style={[styles.title, { fontSize: 18 }]}>
                You don't have any requests.
              </Text>
            </View>
          ) : (
            <View style={styles.buttonsView}>
              {data.map((request) => {
                if (JSON.stringify(request) === "{}") {
                  return;
                } else {
                  return (
                    <RequestComponent
                      name={request.nickname}
                      uid={request.uid}
                      key={request.uid}
                      navigation={navigation}
                    />
                  );
                }
              })}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default RequestScreen;
