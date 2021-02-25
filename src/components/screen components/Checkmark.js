import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from "react-native-animatable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Checkmark = () => {
  return (
    <Animatable.View animation="bounceIn">
      <FontAwesomeIcon icon={faCheckCircle} color={"green"} size={22} />
    </Animatable.View>
  );
};

export default Checkmark;
