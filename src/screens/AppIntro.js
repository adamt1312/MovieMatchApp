import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import styles from "./Styles";
import BackgroundBlurred from "../../components/BackgroundBlurred";
import { fetchUserPendingRequests } from "../../API/firebase/UserPairing/UserPairingMethods";
import RequestComponent from "../../components/screen components/RequestComponent";
import { isLoading } from "expo-font";
import * as firebase from "firebase";
import "firebase/firestore";

// TODO: Create intro slides after registration (react-native-app-intro-slider)
const AppIntro = ({ params }) => {
  return 1;
};

export default AppIntro;
