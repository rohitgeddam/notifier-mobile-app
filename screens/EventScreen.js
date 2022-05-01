import {
    StyleSheet,
    Text,
    Image,
    Pressable,
    View,
    Button,
    TextInput,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";

  import { logout } from "../slice/authSlice";

  import {
    PRIMARY_BTN_COLOR,
    PRIMARY_BACKGROUND_COLOR,
    API_URL,
  } from "../constants";
  import * as Animatable from "react-native-animatable";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  export default function EventScreen({ navigation }) {

    const dispatch = useDispatch()

    const doLogout = async () => {
      try {
        await AsyncStorage.removeItem("userToken");
      } catch (e) {
        console.log(e)
      }
      dispatch(logout())
    }
    return (
      <View style={styles.container}>
        <Text>Events</Text>
          <Button title="logout" onPress={e=>{doLogout()}}>Logout</Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: PRIMARY_BACKGROUND_COLOR,
    },
  });
  