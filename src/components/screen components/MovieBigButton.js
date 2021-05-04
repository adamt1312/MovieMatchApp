import React, { useState } from "react";
import { Text, View, TouchableHighlight, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../screens/LibraryScreen/Styles";

const MovieBigButton = ({ navigation, itemData }) => {
  const [liked, setLiked] = useState(false);

  const tapHandler = (movieData) => {
    navigation.navigate("MovieDetail", {
      data: movieData,
    });
  };

  return (
    <TouchableHighlight
      key={Math.random().toString(36).substr(2, 9)}
      onPress={() => tapHandler(itemData)}
      style={{ width: "100%", alignItems: "center" }}
    >
      <View style={styles.movieButton}>
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + itemData.poster_path,
          }}
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={["black", "transparent"]}
            locations={[0, 0.5]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}
            style={styles.linearGradient}
          />
          <Text style={styles.movieTitle}>
            {itemData.title ? itemData.title : itemData.original_name}
          </Text>
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );
};

export default MovieBigButton;
