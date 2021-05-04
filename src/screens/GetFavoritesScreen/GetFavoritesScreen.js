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
import { FontAwesome } from "@expo/vector-icons";
import SelectableMovieButton from "../../components/screen components/SelectableMovieButton";

const GetFavoritesScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const tapHandler = (movieData) => {
    console.log("tapped");
  };

  const Item = ({ item, index }) => (
    <SelectableMovieButton navigation={navigation} itemData={item} />
    // <TouchableHighlight
    //   key={item.id.toString()}
    //   onPress={() => tapHandler(data[index])}
    //   style={{ width: "100%", alignItems: "center" }}
    // >
    //   <View style={styles.movieButton}>
    //     <ImageBackground
    //       imageStyle={{ borderRadius: 20 }}
    //       source={{
    //         uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
    //       }}
    //       style={styles.backgroundImage}
    //     >
    //       <LinearGradient
    //         colors={["black", "transparent"]}
    //         locations={[0, 0.5]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 2, y: 0 }}
    //         style={styles.linearGradient}
    //       />
    //       <View
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //           justifyContent: "center",
    //           position: "absolute",
    //         }}
    //       >
    //         <View
    //           style={{
    //             width: "75%",
    //             backgroundColor: "red",
    //             position: "absolute",
    //             zIndex: 98,
    //           }}
    //         >
    //           <Text style={styles.movieTitle}>
    //             {item.title ? item.title : item.original_name}
    //           </Text>
    //         </View>
    //         <View
    //           style={{
    //             width: "95%",
    //             zIndex: 98,
    //             alignItems: "flex-end",
    //           }}
    //         >
    //           <AntDesign name="checkcircle" size={40} color="#00e600" />
    //         </View>
    //       </View>
    //     </ImageBackground>
    //   </View>
    // </TouchableHighlight>
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
              style={{ width: "100%" }}
            />
          </>
        )}
      </View>
    </View>
  );
};
export default GetFavoritesScreen;
