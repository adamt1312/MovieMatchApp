import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import axios from "axios";
import InfoCard from "../Components/InfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swiper from "react-native-deck-swiper";

const fetchFont = () => {
  return Font.loadAsync({
    ChaletNewYorkNineteenSeventy: require("../assets/fonts/ChaletNewYorkNineteenSeventy.ttf"),
  });
};

const exploreMoviesScreen = ({ navigation }) => {
  const apiurlSearch =
    "https://api.themoviedb.org/3/search/movie?api_key=7bcd460b3cae3a42e99555ac0e04e8f1&language=en-US&query=";
  const apiurlPopular =
    "https://api.themoviedb.org/3/movie/popular?api_key=7bcd460b3cae3a42e99555ac0e04e8f1&language=en-US";

  const [state, setState] = useState({
    s: "",
    results: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPopular = async () => {
      setIsLoading(true);
      const results = await (await axios(apiurlPopular)).data.results;

      setState({ s: "", results: results });
      setIsLoading(false);
    };
    fetchPopular();
  }, []);

  const search = () => {
    setIsLoading(true);
    axios(apiurlSearch + state.s).then(({ data }) => {
      const results = data.results;
      console.log(results);
      setState({ s: "", results: results });
    });
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <FontAwesomeIcon icon={faSearch} size={25} />
        <TextInput
          style={{ fontSize: 22, marginLeft: 10 }}
          onChangeText={(text) =>
            setState((prevState) => {
              return { ...prevState, s: text };
            })
          }
          onSubmitEditing={search}
          value={state.s}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        state.results.map((result) => (
          <InfoCard
            key={result.id}
            imgUrl={"https://image.tmdb.org/t/p/w300" + result.poster_path}
            vote_average={result.vote_average}
            original_title={result.original_title}
            overview={result.overview}
          />
        ))
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
  },
  searchbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    margin: 5,
  },
  loadWrapper: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigatorContainer: {
    backgroundColor: "gray",
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchableContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  navName: {
    color: "white",
    fontSize: 25,
    borderBottomWidth: 5,
    borderBottomColor: "#491475",
    position: "absolute",
  },
});

export default exploreMoviesScreen;
