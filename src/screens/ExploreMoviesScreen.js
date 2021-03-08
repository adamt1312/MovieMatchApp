import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import InfoCard from "../components/InfoCard";
import Swiper from "react-native-deck-swiper";
import { Input } from "galio-framework";
import styles from "./ExploreMovieScreenStyle";
import { dbLibraryToDisliked } from "../API/firebaseMethods";
import { dbLibraryToLiked } from "../API/firebaseMethods";

const API_KEY = "7bcd460b3cae3a42e99555ac0e04e8f1";

const exploreMoviesScreen = ({ navigation }) => {
  const apiurlSearch =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=en-US&query=";
  const apiurlPopular =
    "https://api.themoviedb.org/3/movie/popular?api_key=" +
    API_KEY +
    "&language=en-US";

  const [data, setData] = useState({
    search: "",
    results: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  let currentMovieInfo;
  // TBD - error handling

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
      const results = data.results;
      setData({ search: "", results: results });
    });
    setIsLoading(false);
  };

  const tapHandler = (cardIndex) => {
    console.log("tapHandler called");
    navigation.navigate("MovieDetail", {
      data: data.results[cardIndex],
    });
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   try {
  //     axios(apiurlSearch + data.search).then(({ data }) => {
  //       setData({ ...data, results: data.results });
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(data.search + " not found in our movie DB!");
  //   }
  // }, [data.search]);

  return (
    <View style={styles.container}>
      <Input
        left
        icon="search1"
        family="antdesign"
        iconSize={25}
        iconColor="black"
        rounded={true}
        fontSize={25}
        color="black"
        onChangeText={(text) =>
          setData((prevdata) => {
            return { ...prevdata, search: text };
          })
        }
        onSubmitEditing={search}
        value={data.search}
        style={{
          position: "relative",
          zIndex: 100,
          elevation: 10,
          width: "85%",
          top: 20,
          backgroundColor: "'rgba(255, 255, 255, 0.7)",
        }}
      />
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
                imgUrl={"https://image.tmdb.org/t/p/w300" + card.poster_path}
                vote_average={card.vote_average}
                original_title={card.title}
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

      {/* <View style={styles.bottomNavigatorContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.touchableContainer}  >
          <Text style={styles.navName}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableContainer}>
          <Text style={styles.navName}>Log In</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default exploreMoviesScreen;
