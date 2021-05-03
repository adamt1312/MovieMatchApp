import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "1",
    title: "Welcome and thank you!",
    text:
      "This app provides an easy way to find out, what movie to watch with your friends.",
    image: require("../assets/images/logo_glow.png"),
    backgroundColor: "#121212",
  },
  {
    key: "2",
    title: "Home",
    text:
      "Here you can navigate either to Explore Movies or to your current session. Explore Movies includes exploring popular movies updated daily or pairing with other user.",
    image: require("../assets/images/home_screenshot.png"),
    backgroundColor: "#121212",
  },
  {
    key: "3",
    title: "Explore Movies",
    text:
      "By swiping left (dislike) or right (like) you can evaluate the movie, which will than be added to your library. To see more details about a movie, tap the card. There is also possible to search on your own.",
    image: require("../assets/images/explore_screenshot.png"),
    backgroundColor: "#121212",
  },
  {
    key: "4",
    title: "Pairing",
    text: "To create session with your friend, you need to send request first.",
    image: require("../assets/images/pair_screenshot.png"),
    backgroundColor: "#121212",
  },
  {
    key: "5",
    title: "Menu",
    text:
      "In a drawer menu you can view your profile or accept/deny requests from other users. Library includes your liked and disliked movies.",
    image: require("../assets/images/menu_screenshot.png"),
    backgroundColor: "#121212",
  },
  {
    key: "6",
    title: "Requests",
    text: "If you want to create a session, you need to accept the request.",
    image: require("../assets/images/requests_screenshot.png"),
    backgroundColor: "#121212",
  },
  {
    key: "7",
    title: "Session",
    text:
      "Session will generate recommended movies for both you and your friend. By swiping you can evaluate them, and than check in matched movies, if you have any match with your friend.",
    image: require("../assets/images/session_screenshot.png"),
    backgroundColor: "#121212",
  },
];

// TODO: Create intro slides after registration (react-native-app-intro-slider)
const AppIntro = ({ navigation }) => {
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}
      >
        <View
          style={
            parseInt(item.key) > 1 ? styles.titleViewRest : styles.titleView1
          }
        >
          <Text
            style={
              parseInt(item.key) > 1
                ? styles.introTitleRest
                : styles.introTitle1
            }
          >
            {item.title}
          </Text>
        </View>
        <Image
          source={item.image}
          style={parseInt(item.key) > 1 ? styles.imgRest : styles.img1}
        />
        <View style={{ flex: 4, padding: 20 }}>
          <Text
            style={
              parseInt(item.key) > 1
                ? styles.descriptionRest
                : styles.description1
            }
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Show real app through
    console.log("finished");
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40,
    alignItems: "center",
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleView1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleViewRest: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    paddingBottom: 15,
  },
  img1: {
    width: "140%",
    resizeMode: "contain",
    height: 450,
    // borderColor: "yellow",
    // borderWidth: 5,
    zIndex: -1,
  },
  imgRest: {
    width: "140%",
    resizeMode: "contain",
    height: 450,
    // borderColor: "yellow",
    // borderWidth: 5,
    zIndex: -1,
  },
  introTitle1: {
    color: "white",
    fontSize: 30,
    fontFamily: "VarelaRound_400Regular",
    textAlign: "center",
  },
  introTitleRest: {
    color: "white",
    fontSize: 30,
    fontFamily: "VarelaRound_400Regular",
    textAlign: "center",
  },
  description1: {
    color: "white",
    fontFamily: "VarelaRound_400Regular",
    fontSize: 20,
    textAlign: "center",
  },
  descriptionRest: {
    color: "white",
    fontFamily: "VarelaRound_400Regular",
    fontSize: 15,
    textAlign: "center",
  },
});

export default AppIntro;
