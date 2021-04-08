import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import styles from "./Styles";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { fetchUserPendingRequests } from "../../API/firebaseMethods";
import RequestComponent from "../../components/screen components/RequestComponent";
import { isLoading } from "expo-font";

const RequestScreen = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      fetchUserPendingRequests().then((data) => {
        setData(data);
        setIsLoading(false);
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
            <RequestComponent name={data[0].nickname} uid={data[0].uid} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default RequestScreen;
