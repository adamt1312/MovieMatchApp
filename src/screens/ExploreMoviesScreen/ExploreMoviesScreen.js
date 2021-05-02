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
import ButtonComponent from "../../components/screen components/ButtonComponent";

const exploreMoviesScreen = ({ navigation }) => {
  const [data, setData] = useState({
    search: "Search your own...",
    results: [],
  });
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const apiurlSearch =
    "https://api.themoviedb.org/3/search/multi?api_key=" +
    keys.tmdbConfig.apiKey +
    "&language=en-US&page=" +
    pageNum +
    "&query=";
  const apiurlPopular =
    "https://api.themoviedb.org/3/trending/all/day?api_key=" +
    keys.tmdbConfig.apiKey +
    "&language=en-US&page=" +
    pageNum;

  // initial fetch for daily popular movies
  const fetchPopularMovies = () => {
    setIsLoading(true);
    axios(apiurlPopular).then(({ data }) => {
      if (data) {
        setData({
          ...data,
          results: data.results,
        });
        setIsLoading(false);
      }
    });
  };

  // fetch searched query (only first page)
  const fetchSearch = () => {
    setIsLoading(true);
    setPageNum(1);
    axios(apiurlSearch + data.search).then(({ data }) => {
      if (data) {
        setData({ search: "", results: data.results });
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    try {
      fetchPopularMovies();
    } catch (error) {
      console.log(error);
    }
  }, [pageNum]);

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
            setData((data) => {
              return { ...data, search: text };
            })
          }
          onSubmitEditing={fetchSearch}
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
          onSwipedAll={() => {
            setPageNum(pageNum + 1);
          }}
        ></Swiper>
      )}
    </View>
  );
};

export default exploreMoviesScreen;
