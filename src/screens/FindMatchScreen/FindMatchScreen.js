import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
  Button,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import UserButton from "../../components/screen components/UserButton";
import { Input } from "galio-framework";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import {
  isUserPaired,
  setSentRequest,
  isExistingUser,
  getSentRequest,
} from "../../API/firebaseMethods";
import { Entypo } from "@expo/vector-icons";
import PulseM from "../../components/screen components/PulseM";
import * as firebase from "firebase";
import "firebase/firestore";

const FindMatchScreen = (props) => {
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const db = firebase.firestore();
  const doc = db.collection("users").doc(firebase.auth().currentUser.uid);

  doc.onSnapshot((doc) => {
    const sr = doc.data().sentRequest;
    if (sr) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  });

  useEffect(() => {
    doc.onSnapshot((doc) => {
      const sr = doc.data().sentRequest;
      if (sr) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
    });
  }, []);

  const pairHandler = (nickname) => {
    try {
      isExistingUser(nickname).then((data) => {
        // user doesn`t exist
        if (!data) {
          Alert.alert("User with this nickname doesn`t exist.");
          setSearchUser("");
        } else {
          isUserPaired(nickname).then((isAvailable) => {
            setIsAvailable(isAvailable);
            setModalVisible(true);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.loadWrapper}>
      <BackgroundBlurred />
      {isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback
              style={styles.container}
              activeOpacity={1}
              onPressOut={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalView}>
                    {isAvailable ? (
                      <View>
                        <Text style={styles.modalText}>
                          Sorry, but
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            {searchUser}{" "}
                          </Text>
                          <Text>is actually, paired with someone else, </Text>
                          <Entypo name="emoji-sad" size={20} color="black" />
                          <Text> try it later.</Text>
                        </Text>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.modalText}>
                          Good news,
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            {searchUser}{" "}
                          </Text>
                          is available, let`s send him a notice that you want to
                          watch with him{" "}
                          <Entypo name="emoji-happy" size={20} color="black" />
                        </Text>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setSentRequest(searchUser);
                          }}
                        >
                          <Text style={styles.textStyle}>
                            Send request to pair
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          {showSearch ? (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 35,
                  fontFamily: "VarelaRound_400Regular",
                }}
              >
                Let`s find a match!
              </Text>

              <Input
                rounded
                left
                icon="search1"
                family="antdesign"
                iconSize={25}
                iconColor="black"
                rounded={true}
                fontSize={20}
                color="black"
                placeholder="Enter a friend's nickname..."
                placeholderTextColor="black"
                style={{ marginTop: 30, width: "90%" }}
                onChangeText={(text) => setSearchUser(text)}
                onSubmitEditing={() => {
                  pairHandler(searchUser);
                }}
              />
            </View>
          ) : (
            <PulseM />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  loadWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "VarelaRound_400Regular",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default FindMatchScreen;
