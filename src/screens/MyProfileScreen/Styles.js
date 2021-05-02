import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 35,
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "VarelaRound_400Regular",
    marginBottom: 10,
  },
  loadWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  info: {
    height: "60%",
    width: "100%",
    marginTop: 50,
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  nickname: {
    fontSize: 30,
    fontFamily: "VarelaRound_400Regular",
    marginVertical: 5,
    color: "white",
  },
  userDetails: {
    marginHorizontal: 25,
    width: "90%",
    justifyContent: "center",
  },
  infoDetail: {
    fontSize: 16,
    fontFamily: "VarelaRound_400Regular",
    marginVertical: 5,
    color: "white",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: { marginRight: 7 },
});

export default styles;
