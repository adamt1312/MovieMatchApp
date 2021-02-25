import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  testConatiner: {
    textAlign: "center",
  },
  scrollV: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    top: 340,
    height: 1300,
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.92);",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginLeft: 10,
    fontFamily: "Roboto_300Light",
  },
  titleContainer: {
    flex: 1,
    width: "90%",
    // borderColor: "green",
    // borderWidth: 4,
    alignContent: "center",
    justifyContent: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 4,
    marginTop: 5,
  },
  overviewContainer: {
    flex: 9,
    width: "85%",
    marginTop: 5,
    // borderColor: "red",
    // borderWidth: 4,
  },
});

export default styles;
