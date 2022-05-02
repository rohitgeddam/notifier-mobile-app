import {
    StyleSheet,
    Text,
    Image,
    Pressable,
    View,
    Button,
    TextInput,
    
    
  } from "react-native";

  import {
    PRIMARY_BTN_COLOR,
    PRIMARY_BACKGROUND_COLOR,
    PRIMARY_BACKGROUND_DARK_COLOR,
    API_URL,
  } from "../constants";

  import * as Animatable from "react-native-animatable";
  import AsyncStorage from "@react-native-async-storage/async-storage";
import { borderStartColor, borderTopColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

  export default function ContainerScreen({ children, title }) {

    
    return (
      <View style={styles.container}>
          {/* <Button title="logout" onPress={e=>{doLogout()}}>Logout</Button> */}
          <Text style={styles.headerText}>{title}</Text>
          <View style={styles.insideContainer}>
              {children}
          </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: "flex-end",
      backgroundColor: PRIMARY_BACKGROUND_DARK_COLOR,
    },

    headerText:{
      textAlign: 'center',
      marginBottom: 24,
      color: 'white',
      fontWeight: '600',
      fontSize: 18,
    },  

    insideContainer: {
      backgroundColor: PRIMARY_BACKGROUND_COLOR,
      height: '85%',
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 16,
    }
  });
  