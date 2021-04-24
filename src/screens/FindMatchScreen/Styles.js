import { StyleSheet } from "react-native";

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
  title: {
    color: "white",
    fontSize: 35,
    fontFamily: "VarelaRound_400Regular",
  },
  searchWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  deniedMsg: {
    fontSize: 29,
    fontFamily: "VarelaRound_400Regular",
    color: "white",
    textAlign: "center",
  },
});

export default styles;
