import React from 'react';
import { StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

const ButtonComponent = () => {
    // const { width, height, title, color } = this.props
    return (
        <TouchableOpacity style={styles.button}>
            <Text>title</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderColor: '#791845',
        borderWidth: 3,
        backgroundColor: 'white',
        width: 300,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    }
});

export default ButtonComponent;