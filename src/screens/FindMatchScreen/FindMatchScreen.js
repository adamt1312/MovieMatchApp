import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { Input } from "galio-framework";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { isUserPaired, isExistingUser } from "../../API/firebaseMethods";
import PulseM from "../../components/screen components/PulseM";
import * as firebase from "firebase";
import "firebase/firestore";
import styles from "./Styles";
import DenyRequestModal from "../../components/screen components/modals/DenyRequestModal";
import InfoModal from "../../components/screen components/modals/InfoModal";

const FindMatchScreen = (props) => {
  const [data, setData] = useState({
    searchUser: "",
    isPaired: false,
    isLoading: false,
    isAvailableModalText: false,
    modalVisible: false,
    showSearch: true,
    denyRequest: false,
    reloadModal: true,
  });

  const db = firebase.firestore();
  const doc = db.collection("users").doc(firebase.auth().currentUser.uid);

  useEffect(() => {
    doc.onSnapshot((doc) => {
      if (doc.data().isPaired) {
        setData((prevState) => ({
          ...prevState,
          denyRequest: false,
          showSearch: false,
          isPaired: true,
        }));
      } else {
        const sentRequest = doc.data().sentRequest;
        // user already sent request, showing waiting screen
        if (sentRequest) {
          setData((prevState) => ({
            ...prevState,
            showSearch: false,
          }));
        }
        // user request is denied, show denyModal
        else if (sentRequest == false) {
          setData((prevState) => ({
            ...prevState,
            showSearch: false,
            denyRequest: true,
          }));
        }
        // user doesn`t sent request, show search
        else if (!sentRequest) {
          setData((prevState) => ({
            ...prevState,
            showSearch: true,
          }));
        }
      }
    });
  }, []);

  const checkAvailability = (nickname) => {
    try {
      isExistingUser(nickname).then((response) => {
        // user doesn`t exist
        if (!response) {
          Alert.alert("User with this nickname doesn't exist.");
          setData((prevState) => ({
            ...prevState,
            searchUser: "",
          }));
        } else {
          isUserPaired(nickname).then((isPaired) => {
            // checking isAvailable status => set modal text => show modal
            if (isPaired) {
              // user is already paired
              setData((prevState) => ({
                ...prevState,
                isAvailable: false,
                modalVisible: true,
              }));
              // user is free to pair
            } else {
              setData((prevState) => ({
                ...prevState,
                isAvailable: true,
                modalVisible: true,
              }));
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hideSearch = () => {
    setData((prevState) => ({
      ...prevState,
      showSearch: false,
    }));
  };

  const closeModal = () => {
    setData((prevState) => ({
      ...prevState,
      modalVisible: false,
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
              closeModal={() => {
                closeModal();
              }}
              hideSearch={() => {
                hideSearch();
              }}
            />
          ) : (
            <InfoModal
              isAvailable={false}
              nickname={data.searchUser}
              visible={data.modalVisible}
              closeModal={() => {
                closeModal();
              }}
              hideSearch={() => {
                hideSearch();
              }}
            />
          )}
          {data.showSearch ? (
            <View style={styles.searchWrapper}>
              <Text style={styles.title}>Let`s find a match!</Text>

              <Input
                rounded
                left
                icon="search1"
                family="antdesign"
                iconSize={25}
                iconColor="black"
                rounded={true}
                fontSize={18}
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
                value={data.searchUser}
              />
            </View>
          ) : (
            <View style={{ justifyContent: "center" }}>
              {data.denyRequest ? (
                <DenyRequestModal
                  nickname={"your friend"}
                  showSearch={() => {
                    setData((prevState) => ({
                      ...prevState,
                      showSearch: true,
                      denyRequest: false,
                    }));
                  }}
                />
              ) : null}
              {/* TODO: Add some info, that cant search other user if
              isPaired...here will maybe be some button to
              showRecommendations... */}
              {data.isPaired ? (
                <Text>
                  You are currently paired, and cannot search other user.
                </Text>
              ) : null}
              <PulseM />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FindMatchScreen;
