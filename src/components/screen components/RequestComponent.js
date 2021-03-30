import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const RequestComponent = (params) => {
  const { name, uid } = params;

  return (
    <View style={styles.wrap}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity
          onPress={() => {
            console.log("pressed check");
          }}
        >
          <FontAwesome5
            name="user-check"
            size={30}
            color="green"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("pressed cancel");
          }}
        >
          <FontAwesome5
            name="user-times"
            size={30}
            color="red"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 15,
    width: "90%",
    height: 70,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  title: {
    fontFamily: "VarelaRound_400Regular",
    fontSize: 25,
    color: "black",
    marginLeft: 25,
  },
  titleWrapper: {
    flex: 1,
    // backgroundColor: "red",
  },
  iconsWrapper: {
    flexDirection: "row",
    // backgroundColor: "blue",
    width: "45%",
    justifyContent: "space-evenly",
  },
  icon: {
    shadowColor: "black",
    shadowRadius: 5,
    // shadowOffset: {
    //   width: 1, // Same rules apply from above
    //   height: 1, // Can't both be 0
    // },
  },
});

export default RequestComponent;
