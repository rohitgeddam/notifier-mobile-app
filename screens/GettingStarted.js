import { StyleSheet, Text, Image, Pressable, View} from "react-native";

import * as Animatable from 'react-native-animatable';

import { PRIMARY_BTN_COLOR, PRIMARY_BACKGROUND_COLOR } from "../constants";

export default function GettingStartedScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Animatable.View style={styles.innerContainer} animation="fadeInUpBig">
        <Animatable.Image animation="bounceIn" duration={3000} delay={500} source={require("../images/SAN.png")} />
        <Text style={styles.infoText}>
          All your college updates at one place
        </Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  innerContainer: {
    display: "flex",
    height: "60%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },
  button: {
    alignItems: "center",
    backgroundColor: PRIMARY_BTN_COLOR,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "75%",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  infoText: {
    color: "#9586A8",
    marginBottom: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
