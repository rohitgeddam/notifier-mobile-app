import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native";

import { API_URL } from "../constants";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_BTN_COLOR } from '../constants'
import * as Animatable from "react-native-animatable";
import NoticeCard from "../components/NoticeCard";

import ContainerScreen from "./ContainerScreen";

export default function NoticeScreen({ navigation }) {
  const userToken = useSelector((state) => state.auth.token);
  const [notices, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(userToken);
    setIsLoading(true);
    fetch(`${API_URL}/api/v1/notices/list/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + userToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNotice(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      })
  }, []);

  return (
    <ContainerScreen title="Notice">
      { isLoading && <ActivityIndicator size="small" color={{PRIMARY_BTN_COLOR}} />}
      <ScrollView style={styles.ScrollView}>
        {notices && notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            title={notice.title}
            tags={notice.tags}
            content={notice.content}
            postedOn={notice.posted_on}
          />
        ))}
      </ScrollView>
    </ContainerScreen>
  );
}

const styles = StyleSheet.create({
  ScrollView:{
    // display: 'flex',
  }
});
