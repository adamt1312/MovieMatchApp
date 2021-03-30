import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // width: "100%",
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  // searchbox: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   padding: 15,
  //   width: "90%",
  //   backgroundColor: "#FFF",
  //   borderRadius: 15,
  //   margin: 5,
  //   position: "absolute",
  // },
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
  inputLine: {
    zIndex: 100,
    elevation: 10,
    width: "120%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginLeft: 10,
  },
  topWrapper: {
    width: "100%",
    // backgroundColor: "lightgray",
    zIndex: 100,
    top: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default styles;
