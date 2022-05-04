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
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { API_URL } from "../constants";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_BTN_COLOR, PRIMARY_BACKGROUND_COLOR } from "../constants";
import * as Animatable from "react-native-animatable";
import NoticeCard from "../components/NoticeCard";
import NoticeDetailScreen from "./NoticeDetailScreen";

import ContainerScreen from "./ContainerScreen";

export function NoticeScreen({ navigation }) {
  const authState = useSelector((state) => {
    return state.auth
  });
  
  console.log("USER TOIDJSFDF", authState)
  const [notices, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log("USER " , authState)
    fetch(`${API_URL}/api/v1/notices/list/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + authState.token,
      },
    })
      .then((res) => {
        console.log("status ", res.status, " ", typeof(res.status))
        if(res.status === 401) {
            return null
        }
        return res.json();
      })
      .then((data) => {
        setNotice(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  // console.log("NOTICES ", notices)
  return (
    <ContainerScreen title="Notice">
      {isLoading && (
        <ActivityIndicator size="large" color={{ PRIMARY_BTN_COLOR }} />
      )}
      <ScrollView style={styles.ScrollView}>
        {notices &&
          notices.map((notice) => (
            <Pressable
              onPress={() => navigation.navigate("notice-detail", {notice: notice})}
              key={notice.id}
            >
              <NoticeCard
                title={notice.title}
                tags={notice.tags}
                content={notice.content}
                postedOn={notice.posted_on}
              />
            </Pressable>
          ))}
      </ScrollView>
    </ContainerScreen>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    // display: 'flex',
  },
});

const Stack = createNativeStackNavigator();

export default function NoticeIndexScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="notice-list"
        component={NoticeScreen}
        options={{ headerShown: false, title: "My home" }}
      />
      <Stack.Screen
        name="notice-detail"
        component={NoticeDetailScreen}
        options={{
          title: "Notice",
          headerStyle: {
            backgroundColor: PRIMARY_BACKGROUND_COLOR,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
