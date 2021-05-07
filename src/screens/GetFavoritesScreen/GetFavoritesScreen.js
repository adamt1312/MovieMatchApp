import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import styles from "./Styles";
import { fetchPopularForQuest } from "../../API/firebase/UserMethods/firebaseUserMethods";
import Swiper from "react-native-deck-swiper";
import {
  dbLibraryToDisliked,
  dbLibraryToLiked,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GetFavoritesScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const tapHandler = (cardIndex) => {
    navigation.navigate("MovieDetail", {
      data: data[cardIndex],
    });
  };

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
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <>
          <View style={[styles.topWrapper, { flexDirection: "column" }]}>
            {counter >= 15 ? (
              <>
                <Text style={styles.title}>Great, you are good to go.</Text>
                <Text style={styles.title}>Enjoy the app!</Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>Choose 15 movies you like</Text>
                <Text style={styles.title}>
                  <AntDesign name="like2" size={24} color="black" /> {counter} /
                  15 <AntDesign name="like2" size={24} color="black" />
                </Text>
              </>
            )}
          </View>

          {counter >= 15 ? (
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={120}
              color="rgba(255,255,255,0.99)"
              style={{ position: "absolute", bottom: 50, zIndex: 150 }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          ) : null}

          <Swiper
            cards={data}
            renderCard={(card) => {
              return (
                <InfoCard
                  imgUrl={"https://image.tmdb.org/t/p/w780" + card.poster_path}
                  vote_average={card.vote_average}
                  original_title={card.title ? card.title : card.original_name}
                  overview={card.overview}
                />
              );
            }}
            onTapCard={(cardIndex) => {
              tapHandler(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              dbLibraryToLiked(data[cardIndex]);
              setCounter(counter + 1);
            }}
            onSwipedLeft={(cardIndex) => {
              dbLibraryToDisliked(data[cardIndex]);
            }}
            horizontalSwipe={true}
            backgroundColor={"transparent"}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            stackSize={5}
            verticalSwipe={false}
            cardIndex={0}
          ></Swiper>
        </>
      )}
    </View>
  );
};
export default GetFavoritesScreen;
