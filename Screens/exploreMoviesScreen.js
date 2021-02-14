import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import * as Font from "expo-font";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import RatingBar from "../Components/Screen components/RatingBar";
import InfoCard from "../Components/InfoCard";

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
    selected: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopular = () => {
    axios(apiurlPopular).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return {
          ...prevState,
          results: results,
        };
      });
    });
  };

  const search = () => {
    axios(apiurlSearch + state.s).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return {
          ...prevState,
          results: results,
        };
      });
    });
  };

  fetchPopular();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchbox}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />

      <View style={styles.results}>
        {state.results.map((result) => (

          <InfoCard
            key={result.id}
            imgUrl={"https://image.tmdb.org/t/p/w300" + result.poster_path}
            vote_average={result.vote_average}
            original_title={result.original_title}
          />

          // <TouchableOpacity key={result.id} style={styles.infoContainer}>
          //   <ActivityIndicator size="large" />
          //   <View style={styles.imageView}>
          //     <View style={styles.ratingBar}>
          //       <RatingBar rating={result.vote_average} />
          //     </View>
          //     <Image
          //       source={{
          //         uri: "https://image.tmdb.org/t/p/w300" + result.poster_path,
          //       }}
          //       style={{
          //         width: "90%",
          //         height: "90%",
          //         borderRadius: 5,
          //         position: "relative",
          //       }}
          //       resizeMode="contain"
          //     />
          //   </View>

          //   <TouchableOpacity style={styles.result}>
          //     <Text style={styles.title}>{result.original_title}</Text>
          //   </TouchableOpacity>
          // </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomNavigatorContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.touchableContainer}  >
          <Text style={styles.navName}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableContainer}>
          <Text style={styles.navName}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#2D0035",
    alignItems: "center",
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    margin: 5,
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
  results: {
    width: "100%",
  },
  infoContainer: {
    width: "90%",
    height: 550,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  result: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    padding: 15,
    marginTop: 30,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
    fontFamily: "ChaletNewYorkNineteenSeventy",
  },
  imageView: {
    width: "90%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingBar: {
    position: "relative",
    top: 38,
    right: 115,
    zIndex: 100,
  },
});

export default exploreMoviesScreen;
