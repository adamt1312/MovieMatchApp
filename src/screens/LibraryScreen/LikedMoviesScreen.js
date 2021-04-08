import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import styles from "./Styles";
import { fetchUserLikedMovies } from "../../API/firebaseMethods";
import { Button } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LikedMoviesScreen = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    try {
      fetchUserLikedMovies().then((data) => {
        setData(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const tapHandler = (movieData) => {
    navigation.navigate("MovieDetail", {
      data: movieData,
    });
  };

  return (
    <View style={styles.container}>
      <BackgroundBlurred />
      <Text style={styles.title}>
        You liked these...
        <AntDesign name="heart" size={40} color="red" />
      </Text>

      <FlatList
        data={data}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            key={item.id.toString()}
            // FIXME: Printing some error with keyExtractor regarding expecting string, but gets number instead
            keyExtractor={(item) => item.id.toString()}
            onPress={() => tapHandler(data[index])}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={styles.movieButton}>
              <ImageBackground
                imageStyle={{ borderRadius: 20 }}
                source={{
                  uri: "https://image.tmdb.org/t/p/w300" + item.poster_path,
                }}
                style={styles.backgroundImage}
              >
                <LinearGradient
                  colors={["transparent", "white"]}
                  locations={[0.1, 0.4]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: -1, y: 0 }}
                  style={styles.linearGradient}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </ImageBackground>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default LikedMoviesScreen;