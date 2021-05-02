import React from "react";
import {
  Text,
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "../../../screens/FindMatchScreen/Styles";
import { setSentRequest } from "../../../API/firebase/UserPairing/UserPairingMethods";

const InfoModal = (props) => {
  const { isAvailable, nickname, visible } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        props.closeModal();
      }}
    >
      <TouchableWithoutFeedback
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => props.closeModal()}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              {isAvailable ? (
                <View>
                  <Text style={styles.modalText}>
                    Good news,
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {nickname}{" "}
                    </Text>
                    is available, let`s send him a notice that you want to watch
                    with him{" "}
                    <Entypo name="emoji-happy" size={20} color="black" />
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      props.closeModal();
                      props.hideSearch();
                      setSentRequest(nickname);
                    }}
                  >
                    <Text style={styles.textStyle}>Send request to pair</Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  <Text style={styles.modalText}>
                    Sorry, but
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {nickname}{" "}
                    </Text>
                    <Text>is actually paired with someone else, </Text>
                    <Entypo name="emoji-sad" size={20} color="black" />
                    <Text> try it later.</Text>
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => props.closeModal()}
                  >
                    <Text style={styles.textStyle}>Got it</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InfoModal;
