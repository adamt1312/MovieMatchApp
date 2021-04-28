import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import HomeButton from "../../components/screen components/HomeButton";
import Swiper from "react-native-deck-swiper";
import styles from "./Styles";
import {
  dbLibraryToDisliked,
  dbLibraryToLiked,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import keys from "../../../config/keys";
import {
  fetchUserSessionRecommendations,
  getCorrectRecommendData,
} from "../../API/firebase/SessionMethods/SessionMethods";

// TODO: 1. On swipeLeft remove from current user recommend list in DB
//       2. On swipeRight remove from current user recommend list in DB and add to liked session list in DB
const SessionScreen = ({ navigation }) => {
  const apiurlSearch =
    "https://api.themoviedb.org/3/search/multi?api_key=" +
    keys.tmdbConfig.apiKey +
    "&language=en-US&query=";
  const apiurlPopular =
    "https://api.themoviedb.org/3/trending/all/week?api_key=" +
    keys.tmdbConfig.apiKey +
    "&language=en-US";

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      fetchUserSessionRecommendations().then((data) => {
        setData(data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("Session Screen use effect: " + error);
    }
  }, []);

  const tapHandler = (cardIndex) => {
    navigation.navigate("MovieDetail", {
      data: data[cardIndex],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <HomeButton navigation={navigation} />
        <View
          style={{
            height: 40,
            borderRadius: 20,
            width: "80%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "VarelaRound_400Regular",
              fontSize: 20,
            }}
          >
            Session with michal19_19
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <Swiper
          cards={data}
          renderCard={(card) => {
            return (
              <InfoCard
                imgUrl={
                  card.poster_path
                    ? "https://image.tmdb.org/t/p/w780" + card.poster_path
                    : "https://wallpaperaccess.com/full/1750657.jpg"
                }
                vote_average={card.vote_average}
                original_title={card.title ? card.title : card.original_name}
                overview={card.overview}
              />
            );
          }}
          onTapCard={(cardIndex) => {
            tapHandler(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            dbLibraryToLiked(data[cardIndex]);
          }}
          onSwipedLeft={(cardIndex) => {
            dbLibraryToDisliked(data[cardIndex]);
          }}
          horizontalSwipe={true}
          backgroundColor={"transparent"}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          stackSize={5}
          verticalSwipe={false}
          cardIndex={0}
        ></Swiper>
      )}
    </View>
  );
};

export default SessionScreen;
