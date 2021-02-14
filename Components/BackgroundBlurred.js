import React from 'react';
import { StyleSheet, ImageBackground, TouchableHighlight, SafeAreaView, TouchableOpacity, StatusBar, Button } from 'react-native';
import 'react-native-gesture-handler';

const BackgroundBlurred = () => {
    return (
        <ImageBackground
            source={require('../assets/login_bg2.png')}
            style={styles.backgroundImage}
            blurRadius={1.3}
        />
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        position: "absolute"
    }
});

export default BackgroundBlurred;