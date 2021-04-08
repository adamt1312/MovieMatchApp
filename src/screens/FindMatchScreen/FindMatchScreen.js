import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "galio-framework";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import {
  isUserPaired,
  setSentRequest,
  isExistingUser,
} from "../../API/firebaseMethods";
import { Entypo } from "@expo/vector-icons";
import PulseM from "../../components/screen components/PulseM";
import * as firebase from "firebase";
import "firebase/firestore";
import styles from "./Styles";
import DenyRequestModal from "../../components/screen components/modals/DenyRequestModal";
import InfoModal from "../../components/screen components/modals/InfoModal";

const FindMatchScreen = (props) => {
  const [data, setData] = useState({
    searchUser: "",
    isLoading: false,
    isAvailable: false,
    modalVisible: false,
    showSearch: true,
    denyRequest: false,
    reloadModal: true,
  });

  const db = firebase.firestore();
  const doc = db.collection("users").doc(firebase.auth().currentUser.uid);

  useEffect(() => {
    doc.onSnapshot((doc) => {
      const sentRequest = doc.data().sentRequest;
      // user already sent request, showing waiting screen
      if (sentRequest) {
        setData((prevState) => ({
          ...prevState,
          showSearch: false,
        }));
        console.log("Sent request: " + sentRequest);
        console.log("Deny request: " + data.denyRequest);
      }
      // user deny request show modal once
      // else if (sentRequest == false) {
      //   setData((prevState) => ({
      //     ...prevState,
      //     denyRequest: true,
      //   }));
      // }
      // user doesn`t sent request, show search
      else if (!sentRequest) {
        setData((prevState) => ({
          ...prevState,
          showSearch: true,
        }));
      }
    });
  }, []);

  const checkAvailability = (nickname) => {
    try {
      console.log("Pair handler user with nickname: " + nickname);
      isExistingUser(nickname).then((response) => {
        // user doesn`t exist
        if (!response) {
          Alert.alert("User with this nickname doesn`t exist.");
          setData((prevState) => ({
            ...prevState,
            searchUser: "",
          }));
        } else {
          isUserPaired(nickname).then((isPaired) => {
            // checking isAvailable status, then set modal text
            if (isPaired) {
              setData((prevState) => ({
                ...prevState,
                isAvailable: false,
              }));
              console.log("isAvailable false");
            } else {
              setData((prevState) => ({
                ...prevState,
                isAvailable: true,
              }));
            }
            console.log("isPaired return: " + isPaired);
            // showingModal
            openModal();
            setData((prevState) => ({
              ...prevState,
              reloadModal: !data.reloadModal,
            }));
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setData((prevState) => ({
      ...prevState,
      modalVisible: true,
    }));
  };

  return (
    <View style={styles.loadWrapper}>
      <BackgroundBlurred />
      {data.isLoading ? (
        <View style={styles.loadWrapper}>
          <ActivityIndicator size={100} color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          {data.isAvailable ? (
            <InfoModal
              isAvailable={true}
              nickname={data.searchUser}
              visible={data.modalVisible}
              reload={data.reloadModal}
            />
          ) : (
            <InfoModal
              isAvailable={false}
              nickname={data.searchUser}
              visible={data.modalVisible}
              reload={data.reloadModal}
            />
          )}
          {data.showSearch ? (
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
                onChangeText={(text) =>
                  setData((prevState) => ({
                    ...prevState,
                    searchUser: text,
                  }))
                }
                onSubmitEditing={() => {
                  checkAvailability(data.searchUser);
                }}
                // value={data.searchUser}
              />
            </View>
          ) : (
            <View style={{ justifyContent: "center" }}>
              {data.denyRequest ? <DenyRequestModal nickname={"Name"} /> : null}
              <PulseM />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FindMatchScreen;
