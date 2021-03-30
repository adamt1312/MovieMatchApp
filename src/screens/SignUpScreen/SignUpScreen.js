import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import "react-native-gesture-handler";
import { registration } from "../../API/firebaseMethods";
import Checkmark from "../../components/screen components/Checkmark";
import styles from "./Styles";

const signUpScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  const [secureTextEntryPassConf, setSecureTextEntryPassConf] = useState(true);

  const emptyState = () => {
    setNickname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSecureTextEntryPassword(true);
    setSecureTextEntryPassConf(true);
  };

  const handlePress = () => {
    if (!nickname) {
      Alert.alert("Nickname is required");
    } else if (!validateEmail(email)) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!confirmPassword) {
      // setPassword("");
      Alert.alert("Confirm password field is required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      // TODO: Validate unique nickname, create function in firebaseMethods
      // if (validateNickname()) {
      //   registration(email, password, nickname);
      //   navigation.navigate("Loading");
      //   emptyState();
      // } else {
      //   Alert.alert("Choose another nickname,this is already taken.");
      //   setNickname("");
      // }

      registration(email, password, nickname);
      navigation.navigate("Loading");
      emptyState();
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login_bg2.png")}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <View style={styles.screenView}>
        <StatusBar backgroundColor="#1d0014" barStyle="light-content" />
        <View style={styles.logoInputContainer}>
          <Text style={styles.appName}>MOVIE TINDER</Text>
        </View>
        <View style={styles.loginInputs}>
          <View style={styles.inputLine}>
            <FontAwesomeIcon icon={faUser} />
            <TextInput
              style={styles.textInputs}
              placeholder="Nickname*"
              autoCapitalize="none"
              value={nickname}
              onChangeText={(nickname) => setNickname(nickname)}
            />

            {nickname.length > 3 ? <Checkmark /> : null}
          </View>

          <View style={styles.inputLine}>
            <FontAwesomeIcon icon={faUser} />
            <TextInput
              style={styles.textInputs}
              placeholder="E-mail*"
              autoCapitalize="none"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />

            {validateEmail(email) ? <Checkmark /> : null}
          </View>

          <View style={styles.inputLine}>
            <FontAwesomeIcon icon={faLock} />
            <TextInput
              style={styles.textInputs}
              placeholder="Password (at least 8 chars*"
              secureTextEntry={secureTextEntryPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />

            {password.length > 8 ? <Checkmark /> : null}

            <TouchableOpacity
              onPress={() =>
                setSecureTextEntryPassword(!secureTextEntryPassword)
              }
            >
              {secureTextEntryPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size={22} />
              ) : (
                <FontAwesomeIcon icon={faEye} size={22} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputLine}>
            <FontAwesomeIcon icon={faLock} />
            <TextInput
              style={styles.textInputs}
              placeholder="Confirm your Password*"
              secureTextEntry={secureTextEntryPassConf}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
            />
            <TouchableOpacity
              onPress={() =>
                setSecureTextEntryPassConf(!secureTextEntryPassConf)
              }
            >
              {secureTextEntryPassConf ? (
                <FontAwesomeIcon icon={faEyeSlash} size={22} />
              ) : (
                <FontAwesomeIcon icon={faEye} size={22} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginButtonsView}>
            <TouchableOpacity onPress={handlePress}>
              <LinearGradient
                colors={["#791845", "#870055"]}
                style={styles.button}
              >
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={[
                styles.button,
                {
                  borderColor: "#791845",
                  borderWidth: 3,
                  backgroundColor: "white",
                  width: 180,
                  height: 35,
                },
              ]}
            >
              <Text
                style={
                  (styles.loginButtonText,
                  {
                    color: "black",
                  })
                }
              >
                Already have an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default signUpScreen;
