import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import RatingBar from "./screen components/RatingBar";
import { LinearGradient } from "expo-linear-gradient";

export default InfoCard = (props) => {
  const { imgUrl, vote_average, original_title, overview } = props;

  return (
    <ImageBackground source={{ uri: imgUrl }} style={styles.backgroundImage}>
      <View style={styles.infoContainer}>
        <LinearGradient
          colors={["transparent", "black"]}
          locations={[0.1, 0.95]}
          style={styles.linearGradient}
        />

        <View style={styles.ratingBar}>
          <RatingBar rating={vote_average} />
        </View>

        <View style={styles.movieInfo}>
          <Text style={styles.title}>{original_title}</Text>

          <Text style={styles.overview}>
            {overview.substring(0, 180) + "..."}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  imageView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingBar: {
    position: "absolute",
    bottom: 222,
    justifyContent: "center",
    zIndex: 100,
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "auto",
    position: "relative",
    resizeMode: "cover",
    justifyContent: "center",
  },
  movieInfo: {
    height: "23%",
    width: "95%",
    position: "absolute",
    bottom: 60,
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "90%",
    flex: 2,
    textAlignVertical: "center",
    fontSize: 20,
    paddingLeft: 10,
    color: "white",
  },
  overview: {
    width: "90%",
    flex: 4,
    textAlignVertical: "center",
    fontSize: 15,
    paddingLeft: 10,
    color: "white",
  },
});
