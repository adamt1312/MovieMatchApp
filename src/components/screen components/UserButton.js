import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { fetchUser } from "../../API/firebaseMethods";

const UserButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        title={props.nickname}
        style={styles.btn}
        onPress={() => {
          props.navigation.navigate("OtherProfile", {
            id: props.id,
            nickname: props.nickname,
          });
        }}
      >
        <FontAwesome name="user-circle" size={30} color="black" />
        <Text
          style={{
            fontFamily: "VarelaRound_400Regular",
            fontSize: 22,
            marginLeft: 10,
          }}
        >
          {props.nickname}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 50,
    margin: 12,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
});

export default UserButton;
