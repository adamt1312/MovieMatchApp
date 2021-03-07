import React from "react";
import { Text, View, StyleSheet } from "react-native";

const FindMatchScreen = ({ params }) => (
  <View style={styles.container}>
    <Text style={{ color: "white", fontSize: 35 }}>Let`s find some match!</Text>
    <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
      TBD: List some users,at the top add search bar, enable to find specific
      user with his nickname.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default FindMatchScreen;
