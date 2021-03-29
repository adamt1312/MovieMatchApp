import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HomeButton = ({ navigation }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.rectangle}>
      <AntDesign
        name="home"
        size={32}
        color="black"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    height: "auto",
    width: "auto",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
  },
});

export default HomeButton;
