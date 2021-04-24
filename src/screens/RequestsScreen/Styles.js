import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  buttonsView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadWrapper: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "VarelaRound_400Regular",
    color: "white",
    textAlign: "center",
    fontSize: 25,
    marginVertical: 20,
  },
  emptyView: {
    flex: 1,
    backgroundColor: "gray",
    flexDirection: "column",
    borderRadius: 30,
    marginHorizontal: 20,
  },
});

export default styles;
