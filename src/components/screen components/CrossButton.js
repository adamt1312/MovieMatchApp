import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CrossButton = (props) => {
  return (
    <TouchableHighlight style={styles.circle}>
      <Entypo
        name="cross"
        size={35}
        color="red"
        onPress={() => setLiked(!liked)}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  circle: {
    marginTop: 10,
    zIndex: 50,
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CrossButton;
