import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import styles from "./Styles";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { fetchUserPendingRequests } from "../../API/firebase/UserPairing/UserPairingMethods";
import RequestComponent from "../../components/screen components/RequestComponent";
import { isLoading } from "expo-font";
import * as firebase from "firebase";
import "firebase/firestore";

// TODO: Add cancel request
const RequestScreen = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    try {
      // fetch pending requests on mount
      // fetchUserPendingRequests().then((data) => {
      //   setData(data);
      //   setIsLoading(false);
      // });

      //  document listener on PendingRequests collection...when changed, fetch again..
      db.collection("users")
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
