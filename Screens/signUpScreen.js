import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground, TouchableHighlight, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faLock, faUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import 'react-native-gesture-handler';


const fetchFont = () => {
  return Font.loadAsync({
    "ChaletNewYorkNineteenSeventy": require('../assets/fonts/ChaletNewYorkNineteenSeventy.ttf')
  });
}

const signUpScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFont}
      onError={() => console.log('error')}
      onFinish={() => { setFontLoaded(true); }}
    />
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const textInputChange = (val) => {
    if (val.lenght != 0) {
      console.log("1");
      setData({
        ...data,
        email: val
      })
      if (validateEmail(val)) {
        console.log("0");
        setData({
          ...data,
          check_textInputChange: true
        })
      }
      else {
        setData({
          ...data,
          check_textInputChange: false
        })
      }
    }
    else {
      console.log("2");
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      })
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const showHidePassword = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  return (
    <ImageBackground source={require('../assets/login_bg2.png')} style={styles.backgroundImage} blurRadius={2}>
      <SafeAreaView style={styles.screenView}>
        <StatusBar backgroundColor='#1d0014' barStyle='light-content' />
        <View style={styles.logoInputContainer}>
          <Text style={styles.appName}>MOVIE TINDER</Text>
          <View style={styles.loginInputs}>
            <View style={styles.inputLine}>
              <FontAwesomeIcon
                icon={faUser}
              />
              <TextInput
                style={styles.textInputs}
                placeholder='E-mail'
                autoCapitalize='none'
                onChangeText={textInputChange}
              />

              {data.check_textInputChange ?
                <Animatable.View
                  animation='bounceIn'
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color={'green'}
                    size={22}
                  />
                </Animatable.View>
                : null}

            </View>
            <View style={styles.inputLine}>
              <FontAwesomeIcon
                icon={faLock}
              />
              <TextInput style={styles.textInputs}
                placeholder='Password'
                secureTextEntry={data.secureTextEntry ? true : false}
                autoCapitalize='none'
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={showHidePassword}
              >
                {data.secureTextEntry ?
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    size={22}
                  />
                  :
                  <FontAwesomeIcon
                    icon={faEye}
                    size={22}
                  />
                }
              </TouchableOpacity>
            </View>

            <View style={styles.inputLine}>
              <FontAwesomeIcon
                icon={faLock}
              />
              <TextInput style={styles.textInputs}
                placeholder='Confirm your Password'
                secureTextEntry={data.secureTextEntry ? true : false}
                autoCapitalize='none'
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={showHidePassword}>
                {data.secureTextEntry ?
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    size={22}
                  />
                  :
                  <FontAwesomeIcon
                    icon={faEye}
                    size={22}
                  />
                }
              </TouchableOpacity>
            </View>

            <View style={styles.loginButtonsView}>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <LinearGradient
                  colors={['#791845', '#870055']}
                  style={styles.button}
                >
                  <Text style={styles.loginButtonText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}
                style={[styles.button, {
                  borderColor: '#791845',
                  borderWidth: 3,
                  backgroundColor: 'white',
                  width: 180,
                  height: 35,
                }]}
              >
                <Text
                  style={styles.loginButtonText, {
                    color: 'black',
                  }}>Switch to Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logoInputContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    color: 'white',
    fontFamily: 'ChaletNewYorkNineteenSeventy',
    fontSize: 43,
    borderBottomWidth: 5,
    borderBottomColor: '#491475',
    marginTop: 30
  },
  textInputs: {
    width: 250,
    paddingLeft: 15
  },
  loginInputs: {
    marginTop: 15
  },
  inputLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 15,
    padding: 10
  },
  button: {
    width: 180,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  loginButtonsView: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default signUpScreen;