import React from "react";
import { StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import { Button } from "galio-framework";

const ButtonComponent = (props) => {
  return (
    <Button
      onPress={props.onPress}
      style={[styles.button, { width: props.width }]}
    >
      <Text style={styles.btnTitle}>{props.title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  btnTitle: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto_300Light",
  },
});

export default ButtonComponent;
