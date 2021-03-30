import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./Styles";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { fetchUserPendingRequests } from "../../API/firebaseMethods";
import RequestComponent from "../../components/screen components/RequestComponent";

const RequestScreen = ({ params }) => {
  const [data, setData] = useState(null);
  // FIXME: Throwing error unexpectedly evaluating data[0], sometimes...
  useEffect(() => {
    try {
      fetchUserPendingRequests().then((data) => {
        setData(data);
        console.log(data[0].nickname);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundBlurred />
      <ScrollView style={styles.scroll}>
        <View style={styles.buttonsView}>
          <RequestComponent name={data[0].nickname} uid={data[0].uid} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RequestScreen;
