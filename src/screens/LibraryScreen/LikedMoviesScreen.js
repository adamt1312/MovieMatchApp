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
import { fetchUserLikedMovies } from "../../API/firebase/UserMethods/firebaseUserMethods";
import { Button } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LikedMoviesScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const tapHandler = (movieData) => {
    navigation.navigate("MovieDetail", {
      data: movieData,
    });
  };

  const Item = ({ item, index }) => (
    <TouchableHighlight
      key={Math.random().toString(36).substr(2, 9)}
      onPress={() => tapHandler(data[index])}
      style={{ width: "100%", alignItems: "center" }}
    >
      <View style={styles.movieButton}>
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
          }}
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={["transparent", "white"]}
            locations={[0, 0.35]}
            start={{ x: 1, y: 0 }}
            end={{ x: -1, y: 0 }}
            style={styles.linearGradient}
          />
          <Text style={styles.movieTitle}>
            {item.title ? item.title : item.original_name}
          </Text>
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );

  const renderItem = ({ item, index }) => {
    return <Item item={item} index={index} />;
  };

  useEffect(() => {
    try {
      fetchUserLikedMovies().then((data) => {
        console.log(data);
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
            <Text style={styles.title}>
              You liked these...
              <AntDesign name="heart" size={40} color="red" />
            </Text>

            <FlatList
              data={data}
              keyExtractor={(item) => {
                item.id.toString() ? item.id.toString() : item.poster_path;
              }}
              renderItem={renderItem}
              style={{ width: "100%" }}
            />
          </>
        )}
      </View>
    </View>
  );
};
export default LikedMoviesScreen;
