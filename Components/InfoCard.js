import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import RatingBar from "./Screen components/RatingBar";
import { LinearGradient } from 'expo-linear-gradient';


const fetchFont = () => {
    return Font.loadAsync({
        ChaletNewYorkNineteenSeventy: require('../assets/fonts/ChaletNewYorkNineteenSeventy.ttf'),
    });
};

export default InfoCard = (props) => {
    const { imgUrl, vote_average, original_title } = props


    return (
        <TouchableOpacity style={styles.infoContainer}>
            <View style={styles.imageView}>
                <View style={styles.ratingBar}>
                    <RatingBar rating={vote_average} />
                </View>
                <Image
                    source={{
                        uri: imgUrl,
                    }}
                    style={{

                        width: "100%",
                        height: "100%",
                        position: "relative",
                    }}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'black']}
                    locations={[0.1, 0.95]}
                    style={styles.linearGradient}
                >
                </LinearGradient>
            </View>

            {/* <TouchableOpacity style={styles.result}>
                <Text>{original_title}</Text>
            </TouchableOpacity> */}
            <Text style={styles.title}>{original_title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    results: {
        width: "100%",
    },
    infoContainer: {
        width: "100%",
        height: 650,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        position: 'absolute',
        bottom: '13%'
    },
    result: {
        position: 'absolute',
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        padding: 15,
        color: "white",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 20,
        fontFamily: "ChaletNewYorkNineteenSeventy",
    },
    imageView: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    ratingBar: {
        position: "absolute",
        bottom: 150,
        justifyContent: 'center',
        zIndex: 100,
    },
    linearGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
});

