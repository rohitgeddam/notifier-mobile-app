import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  Button,
  TextInput,
} from "react-native";

export default function YearPill({ year }) {
  return (
    <View style={styles.container}>
      <Text style={styles.pillContent}>Year - {year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // width: "24%",
    // height: "16%",
    backgroundColor: "#FFC107",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 4,
    marginRight: 4,
  },

  pillContent: {
    fontWeight: "900",
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
});
