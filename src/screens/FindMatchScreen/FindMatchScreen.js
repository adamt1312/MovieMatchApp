import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { fetchAllUsers } from "../../API/firebaseMethods";
import UserButton from "../../components/screen components/UserButton";
import { Input } from "galio-framework";
import BackgroundBlurred from "../../components/BackgroundBlurred";

const FindMatchScreen = (props) => {
  const [usersInfo, setUsersInfo] = useState("NOTWORKING");
  const [isLoading, setIsLoading] = useState(true);

  const { navigation } = props;

  // const users = [
  //   { nickname: "User1", id: "7Olg8IKxN5QCgV2DVAGsd5TMYQw2" },
  //   { nickname: "User2", id: "IFTO5SUsO4dKvBe02oGvNSy9JDZ2" },
  //   { nickname: "User3", id: "3" },
  //   { nickname: "User4", id: "4" },
  //   { nickname: "User5", id: "5" },
  //   { nickname: "User6", id: "6" },
  //   { nickname: "User7", id: "7" },
  // ];

  useEffect(() => {
    try {
      fetchAllUsers().then((data) => {
        setUsersInfo(data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.loadWrapper}>
      <BackgroundBlurred />
      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              color: "white",
              fontSize: 35,
              fontFamily: "VarelaRound_400Regular",
            }}
          >
            Let`s find a match!
          </Text>
          {/* <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontFamily: "VarelaRound_400Regular",
            }}
          >
            TBD: List some users,add search bar at the top, enable to find
            specific user with his nickname.
          </Text> */}

          <Input
            rounded
            left
            icon="search1"
            family="antdesign"
            iconSize={25}
            iconColor="black"
            rounded={true}
            fontSize={21}
            color="black"
            placeholder="Enter a friend's nickname..."
            placeholderTextColor="black"
            style={{ marginTop: 30, width: "90%" }}
          />

          {/* {usersInfo.map((user) => (
            <UserButton
              nickname={user.nickname}
              id={user.id}
              key={user.id}
              navigation={navigation}
            />
          ))} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  loadWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
});

export default FindMatchScreen;
