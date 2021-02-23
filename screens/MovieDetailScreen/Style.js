import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "relative",
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
    height: 800,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "green",
    borderWidth: 4,
    alignItems: "center",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontFamily: "Roboto_300Light",
  },
});

export default styles;
