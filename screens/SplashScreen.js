import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import { PRIMARY_BTN_COLOR, PRIMARY_BACKGROUND_COLOR } from "../constants";
import * as Animatable from "react-native-animatable";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        iterationCount="infinite"
        duration={2000}
        source={require("../images/SAN.png")}
      />
      <Text style={styles.infoText}>All your college updates at one place</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  infoText: {
    color: "#9586A8",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
