import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import "react-native-gesture-handler";
import genresIDs from "../../../genresIDs.json";

const Category = (props) => {
  const movieGenreID = props.id;

  function getGenreName(id) {
    for (const genre of genresIDs.genres) {
      if (id === genre.id) {
        return genre.name;
      }
    }
  }

  return (
    <TouchableHighlight style={styles.wrapper}>
      <Text style={styles.text}>{getGenreName(movieGenreID)}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: "black",
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,0.95)",
    flex: 1,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontFamily: "Roboto",
    color: "black",
  },
});

export default Category;
