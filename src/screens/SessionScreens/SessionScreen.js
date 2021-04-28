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
  sessionMovieLike,
  sessionMovieDislike,
} from "../../API/firebase/SessionMethods/SessionMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: 1. On swipeLeft remove from current user recommend list in DB
//       2. On swipeRight remove from current user recommend list in DB and add to liked session list in DB
const SessionScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [pairedUserNickname, setPairedUserNickname] = useState(null);
  const [session_id, setSession_id] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      fetchUserSessionRecommendations().then(async (arr) => {
        if (arr) {
          const paired = await AsyncStorage.getItem("pairedToUser");
          setPairedUserNickname(paired.toString());
          setData(arr[0]);
          setSession_id(arr[1]);
        }
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
      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : session_id ? (
        <>
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
                Session with {pairedUserNickname}
              </Text>
            </View>
          </View>
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
              sessionMovieLike(data[cardIndex].id, session_id);
              dbLibraryToLiked(data[cardIndex]);
            }}
            onSwipedLeft={(cardIndex) => {
              sessionMovieDislike(data[cardIndex].id, session_id);
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
        </>
      ) : (
        <View>
          <Text style={{ color: "white" }}>You are not in any session.</Text>
        </View>
      )}
    </View>
  );
};

export default SessionScreen;
