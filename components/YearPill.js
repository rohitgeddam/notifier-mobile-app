import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  Button,
  TextInput,
} from "react-native";
import {SECONDARY_BTN_COLOR} from '../constants';

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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 4,
    marginBottom: 4
  },

  pillContent: {
    fontWeight: "900",
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
});
