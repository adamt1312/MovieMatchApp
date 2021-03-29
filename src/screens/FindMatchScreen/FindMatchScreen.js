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
import { isUserPaired, setPendingRequest } from "../../API/firebaseMethods";
import { Entypo } from "@expo/vector-icons";

const FindMatchScreen = (props) => {
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaired, setisPaired] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // const { navigation } = props;

  // useEffect(() => {
  //   try {
  //     fetchAllUsers().then((data) => {
  //       setUsersInfo(data);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const pairHandler = (nickname) => {
    try {
      isUserPaired(nickname).then((isPaired) => {
        setisPaired(isPaired);
        if (!isPaired) {
          setModalVisible(true);
        } else if (isPaired) {
          setModalVisible(true);
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
                    {isPaired ? (
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
                            setPendingRequest(searchUser);
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
