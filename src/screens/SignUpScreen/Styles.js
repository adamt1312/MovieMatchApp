import { StyleSheet } from "react-native";

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
    flex: 2,
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
    flex: 4,
    justifyContent: "center",
  },
  inputLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 30,
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

export default styles;
