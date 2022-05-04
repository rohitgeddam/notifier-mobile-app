import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  Button,
  TextInput,
  useWindowDimensions
} from "react-native";
import {
  PRIMARY_BTN_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_DARK_COLOR,
  API_URL,
} from "../constants";
import * as Animatable from 'react-native-animatable';
import RenderHTML from "react-native-render-html";


import YearPill from "./YearPill";

export default function NoticeCard({ title, content, tags, postedOn }) {
  const { width } = useWindowDimensions();

  return (
    <Animatable.View style={styles.container} animation="fadeInUpBig" duration={1500}>
      <Text style={styles.cardHeading}>{title}</Text>

      <Text style={styles.postedOn}>
        <Text style={{fontWeight: "800"}}>Posted on - </Text>{postedOn}
      </Text>

      {/* <Text style={styles.cardContent} numberOfLines={4} ellipsizeMode="tail">
        {content}
      </Text> */}


      <Text style={styles.cardContent} numberOfLines={4} ellipsizeMode="tail">
          {/* {description} */}
        <RenderHTML contentWidth={width} source={{html: `${content.slice(0,200)}...` }} />
        </Text>
  

      <View style={styles.tagContainer}>
          {tags.map((year) => {
              return(
                  <YearPill key={year} year={year}/>
              )
          })}
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // minHeight: 150,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    marginBottom: 12,

    shadowColor: PRIMARY_BACKGROUND_DARK_COLOR,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },

  cardHeading: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21.78,
    marginBottom: 4,
    letterSpacing: 1,
  },
  cardContent: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 14.5,
      fontWeight: "400",
      lineHeight: 18
  },

  tagContainer:{
      // height: 150,
      flexDirection: 'row',
      marginTop: 16,
      flexWrap: "wrap",
  },
  postedOn:{
    color: 'gray',
    marginBottom: 8
  }
});
