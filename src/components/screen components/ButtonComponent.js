import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from "react-native-reanimated";
import { Button } from "galio-framework";

const ButtonComponent = (props) => {
  return (
    <Button onPress={props.onPress} style={styles.button}>
      <Text style={styles.btnTitle}>{props.title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  // button: {
  //   borderColor: "#791845",
  //   borderWidth: 3,
  //   backgroundColor: "white",
  //   width: 300,
  //   height: 30,
  //   borderRadius: 5,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 15,
  // },
  button: {
    width: "50%",
    backgroundColor: "white",
  },
  btnTitle: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto_300Light",
  },
});

export default ButtonComponent;
