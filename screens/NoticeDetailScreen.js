import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
  useWindowDimensions
} from "react-native";
import {
  PRIMARY_BTN_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_DARK_COLOR,
  API_URL,
} from "../constants";

import YearPill from "../components/YearPill";
import RenderHTML from "react-native-render-html";

export default function NoticeDetailScreen({ route, navigation }) {
  const { notice } = route.params;
  const { width } = useWindowDimensions();

  console.log(notice);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, ...styles.card }}>
        <Text style={styles.headerText} selectable selectionColor="orange">
          {notice.title}
        </Text>
        <Text style={styles.postedOn}>
          <Text style={{ fontWeight: "800" }}>posted on: </Text>
          {notice.posted_on}
        </Text>
        <View style={styles.tagContainer}>
          {notice.tags.map((year) => {
            return <YearPill key={year} year={year} />;
          })}
        </View>

        {Platform.OS === "ios" ? (
          // iOS requires a textinput for word selections
          // <TextInput style={styles.content} value={notice.content} editable={false} multiline />
          <RenderHTML contentWidth={width} source={{html: notice.content }} />

        ) : (
          // Android can do word selections just with <Text>
          // <Text style={styles.content}  selectable>{notice.content}</Text>
          <RenderHTML contentWidth={width} source={{html: notice.content }} />

        )}

        {/* <Text style={styles.content} selectable>
          
        </Text> */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: PRIMARY_BACKGROUND_DARK_COLOR,
    padding: 16,
    paddingBottom: 0,
    justifyContent: "flex-end",
  },

  headerText: {
    textAlign: "center",
    marginBottom: 24,
    color: "black",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 24,
    letterSpacing: 2,
  },

  card: {
    height: "95%",
    backgroundColor: "#fff",
    borderTopEndRadius: 32,
    borderTopLeftRadius: 32,
    elevation: 10,
    padding: 16,
    textAlign: "left",
  },

  postedOn: {
    // marginBottom: 1,
  },

  content: {
    color: "black",
    fontWeight: "500",
    lineHeight: 18,
  },
  tagContainer: {
    // height: 150,
    flexDirection: "row",
    marginTop: 16,
    flexWrap: "wrap",
    marginBottom: 24,
  },
});
