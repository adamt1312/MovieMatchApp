import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import styles from "./Styles";
import {
  fetchPopularForQuest,
  fetchUserLikedMovies,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import { Button } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import SelectableMovieButton from "../../components/screen components/SelectableMovieButton";

const GetFavoritesScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  let likedMoviesIds = new Set();

  const tapHandler = (movieData, isLiked) => {
    if (isLiked) {
      setCounter(counter + 1);
      likedMoviesIds.add(movieData.id);
    } else {
      if (counter > 0) {
        setCounter(counter - 1);
        likedMoviesIds.delete(movieData.id);
      }
    }
    if (counter >= 3) {
      return (
        <MaterialCommunityIcons
          name="arrow-right-circle"
          size={100}
          color="rgba(255,255,255,0.8)"
          style={{ position: "absolute", bottom: 80 }}
        />
      );
    }
  };

  const Item = ({ item, index }) => (
    <SelectableMovieButton
      navigation={navigation}
      itemData={item}
      test={tapHandler}
    />
  );

  const renderItem = ({ item, index }) => <Item item={item} index={index} />;

  useEffect(() => {
    try {
      fetchPopularForQuest().then((data) => {
        setData(data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundBlurred />
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={100} color="white" />
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <MaterialIcons name="stars" size={24} color="red" />
              Best of the best
              <MaterialIcons name="stars" size={24} color="red" />
            </Text>
            <Text style={styles.title}>Choose 10 movies you like</Text>

            <FlatList
              initialNumToRender={15}
              data={data}
              keyExtractor={(item) => {
                return item.id.toString()
                  ? item.id.toString()
                  : item.poster_path;
              }}
              renderItem={renderItem}
              style={{
                width: "100%",
              }}
            />
            {counter >= 10 ? (
              <MaterialCommunityIcons
                name="arrow-right-circle"
                size={100}
                color="rgba(255,255,255,0.8)"
                style={{ position: "absolute", bottom: 80 }}
              />
            ) : null}
          </>
        )}
      </View>
    </View>
  );
};
export default GetFavoritesScreen;
