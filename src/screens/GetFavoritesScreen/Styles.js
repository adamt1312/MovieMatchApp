import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  movieButton: {
    height: 100,
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    marginVertical: 10,
  },
  movieTitle: {
    color: "white",
    position: "absolute",
    zIndex: 100,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "VarelaRound_400Regular",
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: 3, height: 1 },
    // textShadowRadius: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    position: "absolute",
    zIndex: 1,
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  emptyView: {
    height: "10%",
    width: "80%",
    backgroundColor: "gray",
    flexDirection: "column",
    borderRadius: 30,
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleEmpty: {
    fontFamily: "VarelaRound_400Regular",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 20,
  },
});

export default styles;
