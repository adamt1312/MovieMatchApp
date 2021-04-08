import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  scrollV: {
    position: "absolute",
    width: "100%",
    height: "100%",
    fontFamily: "VarelaRound_400Regular",
  },
  infoContainer: {
    top: 340,
    height: 1000,
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.92);",
    fontFamily: "VarelaRound_400Regular",
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
    fontFamily: "VarelaRound_400Regular",
  },
  titleContainer: {
    height: "auto",
    width: "90%",
    // borderColor: "green",
    // borderWidth: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryContainer: {
    width: "110%",
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 4,
    marginTop: 5,
    paddingHorizontal: 10,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    fontFamily: "VarelaRound_400Regular",
  },
  overviewContainer: {
    flex: 9,
    width: "85%",
    marginTop: 5,
    // borderColor: "red",
    // borderWidth: 4,
  },
  buttonsWrapper: {
    position: "absolute",
    zIndex: 100,
    bottom: 30,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default styles;
