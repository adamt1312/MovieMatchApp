import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Swing } from "react-native-animated-spinkit";
import { LinearGradient } from "expo-linear-gradient";

const NoSession = () => {
  return (
    <View style={styles.container}>
      <Swing size={100} color="#FFF" />
      <LinearGradient
        colors={["transparent", "#480048"]}
        locations={[0.1, 0.95]}
        style={styles.linearGradient}
      />
      <Text style={styles.title}>You are not in any session.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 25,
    fontFamily: "VarelaRound_400Regular",
    color: "white",
    marginVertical: 20,
  },
});

export default NoSession;
