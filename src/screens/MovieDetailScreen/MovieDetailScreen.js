import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import Category from "../../components/screen components/Category";
import { Button } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./Style";
import HeartButton from "../../components/screen components/HeartButton";
import CrossButtton from "../../components/screen components/CrossButton";

const MovieDetailScreen = ({ route, navigation }) => {
  const data = route.params.routes;

  return (
    <ImageBackground
      source={{ uri: "https://image.tmdb.org/t/p/w300" + data.poster_path }}
      style={styles.backgroundImage}
    >
      <View style={styles.buttonsWrapper}>
        <CrossButtton />
        <HeartButton />
      </View>

      <ScrollView style={styles.scrollV}>
        <View style={styles.infoContainer}>
          <View style={[styles.titleContainer, { margin: 15 }]}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.categoryContainer}>
              {data.genre_ids.map((n) => {
                return <Category id={n} key={n} />;
              })}
            </View>
          </View>

          <View style={styles.overviewContainer}>
            <Text style={[styles.title, { fontSize: 18 }]}>
              Original title: {data.original_title}
            </Text>
            <Text style={[styles.title, { fontSize: 18 }]}>
              Language: {data.original_language}
            </Text>
            <Text style={[styles.title, { fontSize: 18 }]}>
              Average rating: {data.vote_average}
            </Text>
            <Text style={[styles.title, { fontSize: 18 }]}>
              Vote count: {data.vote_count}
            </Text>

            <Text style={[styles.title, { fontSize: 25, marginTop: 30 }]}>
              Plot
            </Text>

            <Text style={[styles.title, { fontSize: 15, marginTop: 10 }]}>
              {data.overview}
            </Text>
            <View style={{ alignItems: "center", marginTop: 100 }}>
              <Button
                onPress={() => {
                  navigation.navigate("Home");
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
                  Go home
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default MovieDetailScreen;
