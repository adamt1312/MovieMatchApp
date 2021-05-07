import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 120,
    fontFamily: "VarelaRound_400Regular",
  },
  topWrapper: {
    width: "100%",
    zIndex: 100,
    top: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 15,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});

export default styles;
