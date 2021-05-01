import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: "center",
    // borderColor: "yellow",
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
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    height: 50,
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 5,
    marginBottom: 10,
  },
  btnTitle: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto_300Light",
  },
  welcomeMsg: {
    fontSize: 30,
    color: "white",
    fontFamily: "VarelaRound_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  statusMsg: {
    fontSize: 18,
    color: "rgba(255,255,255,1)",
    fontFamily: "VarelaRound_400Regular",
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  pairedText: {
    fontSize: 15,
    color: "white",
    fontFamily: "VarelaRound_400Regular",
    textAlign: "center",
  },
  menuMsgWrapper: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 5,
    padding: 20,
  },
  infoWrapper: {
    // borderColor: "blue",
    // borderWidth: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 30,
  },
  halfsWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  session: {
    fontSize: 45,
    textAlign: "center",
    fontFamily: "VarelaRound_400Regular",
    // borderColor: "blue",
    // borderWidth: 5,
    width: "100%",
  },
});

export default styles;
