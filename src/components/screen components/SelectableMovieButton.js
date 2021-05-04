import React, { useEffect, useState } from "react";
import { Text, View, TouchableHighlight, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../screens/GetFavoritesScreen/Styles";
import { AntDesign } from "@expo/vector-icons";

const SelectableMovieButton = ({ navigation, itemData, test }) => {
  const [isLiked, setIsLiked] = useState(false);

  // handle tap in parent component
  useEffect(() => {
    test(itemData, isLiked);
  }, [isLiked]);

  return (
    <TouchableHighlight
      key={itemData.id.toString()}
      onPress={() => {
        setIsLiked(!isLiked);
      }}
      style={{ width: "95%", alignItems: "center" }}
    >
      <View style={[styles.movieButton]}>
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
          <View
            style={[
              {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                position: "absolute",
                backgroundColor: isLiked
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.0)",
                borderRadius: 20,
                zIndex: 97,
              },
            ]}
          >
            <View
              style={{
                width: "75%",
                height: "100%",
                justifyContent: "center",
                position: "absolute",
                zIndex: 98,
              }}
            >
              <Text style={styles.movieTitle}>
                {itemData.title ? itemData.title : itemData.original_name}
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                zIndex: 98,
                alignItems: "flex-end",
              }}
            >
              {isLiked ? (
                <AntDesign name="checkcircle" size={40} color="#00e600" />
              ) : null}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );
};

export default SelectableMovieButton;
