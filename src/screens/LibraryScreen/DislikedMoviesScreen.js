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
  fetchUserDislikedMovies,
  fetchUserLikedMovies,
} from "../../API/firebase/UserMethods/firebaseUserMethods";
import { Button } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import MovieBigButton from "../../components/screen components/MovieBigButton";

const DislikedMoviesScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const Item = ({ item, index }) => (
    <MovieBigButton itemData={item} navigation={navigation} />
  );

  const renderItem = ({ item, index }) => <Item item={item} index={index} />;

  useEffect(() => {
    try {
      fetchUserDislikedMovies().then((data) => {
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
              These not so much...
              <FontAwesome5 name="heart-broken" size={40} color="red" />{" "}
            </Text>

            <FlatList
              data={data}
              keyExtractor={(item) => {
                return item.id.toString()
                  ? item.id.toString()
                  : item.poster_path;
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
export default DislikedMoviesScreen;
