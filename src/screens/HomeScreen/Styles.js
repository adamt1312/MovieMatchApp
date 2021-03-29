import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenView: {
    // height: "100%",
    // width: "100%",
    flex: 1,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 5,
  },
  appName: {
    color: "white",
    fontSize: 43,
    borderBottomWidth: 5,
    fontFamily: "ChaletNewYorkNineteenSeventy",
    borderBottomColor: "#491475",
    position: "absolute",
    top: 20,
  },
  buttonContainer: {
    position: "absolute",
    top: "40%",
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 5,
  },
  card: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
  },
  button: {
    width: "50%",
    backgroundColor: "white",
  },
  iconWrapper: {
    width: "100%",
    justifyContent: "flex-start",
    flex: 1,
    // borderColor: "yellow",
    // borderWidth: 5,
    padding: 15,
  },
  btnTitle: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto_300Light",
  },
});

export default styles;
