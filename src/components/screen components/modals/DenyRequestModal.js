import React, { useState } from "react";
import { Text, View, Modal, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "../../../screens/FindMatchScreen/Styles";
import * as firebase from "firebase";
import "firebase/firestore";
import { setSentRequestFalseOrNull } from "../../../API/firebaseMethods";

const DenyRequestModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { nickname } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={[styles.modalText, { color: "black" }]}>
              Sorry, but
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {" " + nickname + " "}
              </Text>
              <Text>deny your request to pair.</Text>
              <Text> But don`t worry, you can try someone else. </Text>
              <Entypo name="emoji-happy" size={20} color="black" />
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setSentRequestFalseOrNull(
                  firebase.auth().currentUser.uid,
                  null
                );
                props.showSearch();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DenyRequestModal;
