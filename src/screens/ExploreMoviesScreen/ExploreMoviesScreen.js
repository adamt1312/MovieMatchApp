import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import HomeButton from "../../components/screen components/HomeButton";
import Swiper from "react-native-deck-swiper";
import { Input } from "galio-framework";
import styles from "./Styles";
import {
  dbLibraryToDisliked,
  dbLibraryToLiked,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import keys from "../../../config/keys";

const exploreMoviesScreen = ({ navigation }) => {
  const apiurlSearch =
    "https://api.themoviedb.org/3/search/multi?api_key=" +
    keys.tmdbConfig.apiKey +
    "&language=en-US&query=";
  const apiurlPopular =
    "https://api.themoviedb.org/3/trending/all/week?api_key=" +
    keys.tmdbConfig.apiKey +
    "&language=en-US";

  const [data, setData] = useState({
    search: "Search your own...",
    results: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  let currentMovieInfo;
  // TODO: - error handling

  useEffect(() => {
    try {
      axios(apiurlPopular).then(({ data }) => {
        setData({
          ...data,
          results: data.results,
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const search = () => {
    setIsLoading(true);
    axios(apiurlSearch + data.search).then(({ data }) => {
      if (data) {
        const results = data.results;
        setData({ search: "", results: results });
        setIsLoading(false);
      }
    });
  };

  const tapHandler = (cardIndex) => {
    navigation.navigate("MovieDetail", {
      data: data.results[cardIndex],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <HomeButton navigation={navigation} />
        <Input
          left
          icon="search1"
          family="antdesign"
          iconSize={25}
          iconColor="black"
          rounded={true}
          fontSize={20}
          color="black"
          placeholder="Search your own.."
          onChangeText={(text) =>
            setData((prevdata) => {
              return { ...prevdata, search: text };
            })
          }
          onSubmitEditing={search}
          value={data.search}
          style={styles.inputLine}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <Swiper
          cards={data.results}
          renderCard={(card) => {
            return (
              <InfoCard
                imgUrl={"https://image.tmdb.org/t/p/w780" + card.poster_path}
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
            dbLibraryToLiked(data.results[cardIndex]);
          }}
          onSwipedLeft={(cardIndex) => {
            dbLibraryToDisliked(data.results[cardIndex]);
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

export default exploreMoviesScreen;
