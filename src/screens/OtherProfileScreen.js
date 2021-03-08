import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { styles } from "./MyProfileScreen";
import { fetchUser } from "../API/firebaseMethods";
import { FontAwesome } from "@expo/vector-icons";

const OtherProfileScreen = ({ route }) => {
  const [data, setData] = useState({
    nickname: null,
    id: null,
  });

  useEffect(() => {
    try {
      fetchUser(route.params.id).then((response) => {
        setData({ ...data, nickname: response });
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={100} color="black" />
      <Text style={styles.title}>{"ID: " + data.id}</Text>
      <Text style={styles.title}>{"Nickname: " + data.nickname}</Text>
    </View>
  );
};

export default OtherProfileScreen;
