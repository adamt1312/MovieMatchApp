import React from "react";
import { StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import { Button } from "galio-framework";

const ButtonComponent = (props) => {
  return (
    <Button onPress={props.onPress} style={styles.button}>
      <Text style={styles.btnTitle}>{props.title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
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
