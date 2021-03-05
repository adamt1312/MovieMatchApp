import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HeartButton = () => {
  const [liked, setLiked] = useState(false);

  return liked ? (
    <View style={styles.circle}>
      <FontAwesome
        name="heart"
        size={32}
        color="red"
        onPress={() => setLiked(!liked)}
      />
    </View>
  ) : (
    <View style={styles.circle}>
      <FontAwesome
        name="heart-o"
        size={32}
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeartButton;
