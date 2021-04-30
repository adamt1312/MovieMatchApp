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
  sessionMovieLike,
  sessionMovieDislike,
  endSession,
  generateRecommendedNextPageNum,
} from "../../API/firebase/SessionMethods/SessionMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../../components/screen components/ButtonComponent";
import NoSession from "../../components/NoSession";

// TODO: Finish fetching more movies before last card rendered...
const SessionScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [pairedUserNickname, setPairedUserNickname] = useState(null);
  const [session_id, setSession_id] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const swipedAllHandler = () => {
    console.log("swipedhandler");
    setIsLoading(true);
    generateRecommendedNextPageNum().then((resp) => {
      fetchUserSessionRecommendations().then((arr) => {
        setData(arr[0]);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    try {
      fetchUserSessionRecommendations().then(async (arr) => {
        if (arr) {
          const paired = await AsyncStorage.getItem("pairedToUser");
          setPairedUserNickname(paired.toString());
          setData(arr[0]);
          AsyncStorage.setItem("session_id", arr[1]);
          setSession_id(arr[1]);
        } else if (!arr) {
          AsyncStorage.setItem("session_id", "");
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
            <View style={styles.pairedWith}>
              <Text style={styles.title}>
                Session with {pairedUserNickname}
              </Text>
            </View>
          </View>
          <ButtonComponent title={"END SESSION"} onPress={endSession} />
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
              sessionMovieLike(data[cardIndex].id, session_id);
              console.log(
                cardIndex + 1,
                data.length - 1,
                cardIndex + 1 == data.length - 1
              );
              if (cardIndex + 1 == data.length - 1) {
                swipedAllHandler();
              }
            }}
            onSwipedLeft={(cardIndex) => {
              dbLibraryToDisliked(data[cardIndex]);
              sessionMovieDislike(data[cardIndex].id, session_id);
              console.log(
                cardIndex + 1,
                data.length - 1,
                cardIndex + 1 == data.length - 1
              );
              if (cardIndex + 1 == data.length - 1) {
                swipedAllHandler();
              }
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
        <NoSession navigation={navigation} />
      )}
    </View>
  );
};

export default SessionScreen;
