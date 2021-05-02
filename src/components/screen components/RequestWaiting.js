import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Pulse } from "react-native-animated-spinkit";
import { Entypo } from "@expo/vector-icons";
import ButtonComponent from "./ButtonComponent";
import { cancelSentRequest } from "../../API/firebase/UserPairing/UserPairingMethods";

const RequestWaiting = (props) => {
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
      <View style={styles.btnWrapper}>
        <ButtonComponent
          title={"Cancel  request"}
          width={"50%"}
          onPress={() => {
            cancelSentRequest();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    padding: 25,
  },
  wrapper: {
    flex: 2,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  txt: {
    color: "white",
    textAlign: "center",
    fontFamily: "VarelaRound_400Regular",
    fontSize: 25,
  },
  btnWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default RequestWaiting;
