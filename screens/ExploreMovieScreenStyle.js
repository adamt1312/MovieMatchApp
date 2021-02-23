import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
  },
  searchbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    margin: 5,
    position: "absolute",
  },
  loadWrapper: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigatorContainer: {
    backgroundColor: "gray",
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchableContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  navName: {
    color: "white",
    fontSize: 25,
    borderBottomWidth: 5,
    borderBottomColor: "#491475",
    position: "absolute",
  },
  button: {
    width: "50%",
    backgroundColor: "white",
  },
});

export default styles;
