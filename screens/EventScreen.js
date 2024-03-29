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
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ContainerScreen from "./ContainerScreen";
import EventDetailScreen from "./EventDetailScreen"
import {
  PRIMARY_BTN_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  API_URL,
} from "../constants";
import EventCard from '../components/EventCard';

import * as Animatable from "react-native-animatable";

export  function EventScreen({ navigation }) {
  const authState = useSelector((state) => {
    return state.auth
  });

  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    populateData();
  }, []);

  const populateData = () => {

    fetch(`${API_URL}/api/v1/events/list/`, {
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
        setEvents(data);
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
    populateData();
  }, []);

  return (
    <ContainerScreen title="Events">
    {isLoading && (
      <ActivityIndicator size="large" color={{ PRIMARY_BTN_COLOR }} />
    )}
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.ScrollView} refreshControl={
        <RefreshControl
          refreshing = {refreshing}
          onRefresh = {onRefresh}  
        />
      }>
      {events &&
        events.map((event) => (
          <Pressable
            onPress={() => navigation.navigate("event-detail", {event: event})}
            key={event.id}
          >
            <EventCard
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              postedOn={event.posted_on}
            />
          </Pressable>
        ))}
    </ScrollView>
  </ContainerScreen>
  );
}

const styles = StyleSheet.create({
  
});


const Stack = createNativeStackNavigator();

export default function IndexScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="event-list"
        component={EventScreen}
        options={{ headerShown: false,}}
      />
      <Stack.Screen
        name="event-detail"
        component={EventDetailScreen}
        options={{
          title: "Event",
          headerStyle: {
            backgroundColor: PRIMARY_BACKGROUND_COLOR,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
