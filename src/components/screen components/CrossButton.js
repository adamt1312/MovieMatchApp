import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CrossButton = () => {
  const [liked, setLiked] = useState(false);

  return liked ? (
    <View style={styles.circle}>
      <Entypo
        name="cross"
        size={35}
        color="red"
        onPress={() => setLiked(!liked)}
      />
    </View>
  ) : (
    <View style={styles.circle}>
      <Entypo
        name="cross"
        size={35}
        color="black"
        onPress={() => setLiked(!liked)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CrossButton;
