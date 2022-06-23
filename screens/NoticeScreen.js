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
  RefreshControl
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { API_URL } from "../constants";

import { useEffect, useState, useCallback} from "react";
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
  
  const [notices, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    populateData();
  }, []);

  const populateData = () => {
    fetch(`${API_URL}/api/v1/notices/list/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + authState.token,
      },
    })
      .then((res) => {
        if(res.status === 401) {
            return null
        }
        return res.json();
      })
      .then((data) => {
        setNotice(data);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRefreshing(false);
        console.log(err);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    populateData()
  }, []);
  // console.log("NOTICES ", notices)
  return (
    <ContainerScreen title="Notice">
      {isLoading && (
        <ActivityIndicator size="large" color={{ PRIMARY_BTN_COLOR }} />
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1, ...styles.ScrollView }}  refreshControl={
        <RefreshControl
          refreshing = {refreshing}
          onRefresh = {onRefresh}  
        />
      }>
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
        options={{ headerShown: false, }}
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
