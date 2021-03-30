import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Pulse } from "react-native-animated-spinkit";
import { Entypo } from "@expo/vector-icons";

const PulseM = ({ params }) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.wrapper}>
        <Text style={styles.txt}>YOUR REQUEST IS WAITING TO BE ACCEPTED </Text>
        <Entypo
          name="emoji-happy"
          size={50}
          color="white"
          style={{ marginTop: 20 }}
        />
      </View>
      <Pulse
        size={350}
        color="#FFF"
        style={{
          position: "absolute",
          backgroundColor: "white",
          marginBottom: 800,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: "auto",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(70,24,87,0.6)",
    borderRadius: 35,
    padding: 25,
  },
  wrapper: {
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  txt: {
    color: "white",
    textAlign: "center",
    fontFamily: "VarelaRound_400Regular",
    fontSize: 25,
  },
});

export default PulseM;
