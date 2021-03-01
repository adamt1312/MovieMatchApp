import ProgressCircle from 'react-native-progress-circle'
import React from 'react';
import { Text } from 'react-native';

const RatingBar = (props) => {
    const rating = parseFloat(props.rating)

    if (rating <= 5) {
        return (
            <ProgressCircle
                percent={props.rating * 10}
                radius={30}
                borderWidth={6}
                color='#D70B1D'
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 15 }}>{(rating * 10) == 0 ? 'N/A' : rating}</Text>
            </ProgressCircle>
        );
    }
    else if (rating <= 7) {
        return (
            <ProgressCircle
                percent={props.rating * 10}
                radius={30}
                borderWidth={6}
                color='#ED9300'
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 15 }}>{props.rating}</Text>
            </ProgressCircle>
        );
    }
    else {
        return (
            <ProgressCircle
                percent={props.rating * 10}
                radius={30}
                borderWidth={6}
                color='#32D700'
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 15 }}>{props.rating}</Text>
            </ProgressCircle>
        );
    }
}
export default RatingBar;