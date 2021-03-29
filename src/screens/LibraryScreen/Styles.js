import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  movieButton: {
    height: 100,
    width: "95%",
    // backgroundColor: "pink",
    borderRadius: 20,
    justifyContent: "center",
    marginVertical: 10,
  },
  movieTitle: {
    color: "white",
    marginLeft: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default styles;
