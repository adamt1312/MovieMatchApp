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
  ActivityIndicator,
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
import { signIn } from "../API/firebaseMethods";
import Checkmark from "../components/screen components/Checkmark";

export default function signInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  let loading = false;

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }
    console.log(
      "Going to sign in with email: " + email + " and password " + password
    );
    signIn(email, password);
    setEmail("");
    setPassword("");
  };

  const validateEmail = (email) => {
    let re = email.replace(/\s/g, "");
    re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <ImageBackground
      source={require("../assets/images/login_bg2.png")}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <View style={styles.screenView}>
        <StatusBar backgroundColor="#1d0014" barStyle="light-content" />
        <View style={styles.logoInputContainer}>
          <Text style={styles.appName}>MOVIE MATCH</Text>
        </View>
        <View style={styles.loginInputs}>
          <View style={styles.inputLine}>
            <FontAwesomeIcon icon={faUser} />
            <TextInput
              style={styles.textInputs}
              placeholder="E-mail"
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
              placeholder="Password"
              secureTextEntry={secureTextEntryPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
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

          <View style={styles.loginButtonsView}>
            <TouchableOpacity onPress={handlePress}>
              <LinearGradient
                colors={["#791845", "#870055"]}
                style={styles.button}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
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
                Don't have an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoInputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    color: "white",
    fontFamily: "VarelaRound_400Regular",
    fontSize: 43,
    borderBottomWidth: 5,
    borderBottomColor: "#491475",
    marginTop: 30,
  },
  textInputs: {
    width: 250,
    paddingLeft: 15,
  },
  loginInputs: {
    flex: 3,
    marginTop: 15,
    top: 100,
  },
  inputLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 15,
    padding: 10,
  },
  button: {
    width: 180,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  loginButtonsView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});