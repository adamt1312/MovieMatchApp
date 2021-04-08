import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "../../../screens/FindMatchScreen/Styles";
import {
  isUserPaired,
  setSentRequest,
  isExistingUser,
} from "../../../API/firebaseMethods";

const InfoModal = (props) => {
  const { isAvailable, nickname, visible, reload } = props;
  const [showModal, setShowModal] = useState(null);

  // use Effect makes sure that modal opens from prop everytime...
  useEffect(() => {
    setShowModal(visible);
  }, [reload]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(visible);
      }}
    >
      <TouchableWithoutFeedback
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => setShowModal(false)}
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
                      setShowModal(false);
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
                    <Text>is actually, paired with someone else, </Text>
                    <Entypo name="emoji-sad" size={20} color="black" />
                    <Text> try it later.</Text>
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
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
