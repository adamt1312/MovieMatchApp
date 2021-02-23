import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import InfoCard from "../../components/InfoCard";
import { Button, Card } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";

const MovieDetailScreen = ({ route, navigation }) => {
  const data = route.params.routes;

  return (
    <ImageBackground
      source={{ uri: "https://image.tmdb.org/t/p/w300" + data.poster_path }}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.scrollV}>
        <View style={styles.infoContainer}>
          <LinearGradient
            colors={["transparent", "black"]}
            locations={[0.1, 0.75]}
            style={styles.linearGradient}
          />
          <Text style={styles.title}>{data.title}</Text>
          <Button
            onPress={() => {
              navigation.navigate("ExploreMovies");
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 20,
                fontFamily: "Roboto_300Light",
              }}
            >
              Go back
            </Text>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default MovieDetailScreen;
