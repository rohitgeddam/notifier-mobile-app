import { Provider } from "react-redux";
import { store } from "./store";
import { StyleSheet, View, Text, SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PRIMARY_BACKGROUND_COLOR } from "./constants";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";

import GettingStartedScreen from "./screens/GettingStarted";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import NoticeScreen from "./screens/NoticeScreen";
import EventScreen from "./screens/EventScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import { API_URL } from "./constants";

import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "./slice/authSlice";
import LogoutScreen from "./screens/logoutScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function IndexTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Notice"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Notice") {
            iconName = focused ? "megaphone" : "megaphone-outline";
          } else if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Jobs") {
            iconName = focused ? "school" : "school-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return (
            <IonIcon
              name={iconName}
              size={30}
              color={PRIMARY_BACKGROUND_COLOR}
            />
          );
        },
        tabBarActiveTintColor: PRIMARY_BACKGROUND_COLOR,
        tabBarInactiveTintColor: "gray",
        showLabel: false,
      })}
    >
      <Tab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{ headerShown: false }}
      />

      {/* <Tab.Screen
        name="Jobs"
        component={LogoutScreen}
        options={{ headerShown: false }}
      /> */}

      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const post_push_token = (token, userToken) => {
  fetch(`${API_URL}/api/v1/push_token/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + userToken,
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((res) => {
      if(res.status === 401){
        Toast.show({
          type: "info",
          text1: "Notifications",
          text2:
            "Invalid user token",
        });
      } else {
        console.log("TOKEN SENT TO SERVER")
        Toast.show({
          type: "info",
          text1: "Notifications",
          text2:
            "Push Token Sent to the server",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Notifications",
        text2:
          "There was some error while enabling push notification for your device",
      });
    });
};

async function registerForPushNotificationsAsync() {

  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Toast.show({
        type: "error",
        text1: "Notifications",
        text2:
          "Failed to get push token for push notification!",
      });

      alert("Permission Not Granted for Notifications 🤦. Please enable notifications for this app from your notification settings 🤧.")
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function IndexScreen() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // const registerForPushNotificationsAsync = async () => {
  //   try {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       Toast.show({
  //         type: "error",
  //         text1: "Notifications",
  //         text2: "Permission not granted!",
  //       });
  //     }
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);

  //     if (Platform.OS === "android") {
  //       Notifications.setNotificationChannelAsync("default", {
  //         name: "default",
  //         importance: Notifications.AndroidImportance.MAX,
  //         vibrationPattern: [0, 250, 250, 250],
  //         lightColor: "#FF231F7C",
  //       });
  //     }

  //     return token;
  //   } catch (error) {
  //     console.error(error);
  //     Toast.show({
  //       type: "error",
  //       text1: "Notifications",
  //       text2: error,
  //     });
  //   }
  // };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // setExpoPushToken(token);
      if (token && authState.token) {
        post_push_token(token, authState.token);
      }

    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("RECEIVE");
        // refresh page
        Toast.show({
          type: "info",
          text1: "New Notification",
          text2: "Please refresh the page to see the new notification 🎅",
        });
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [authState]);

  //   const [isLoading, setIsLoading]= useState(false)

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }

      dispatch(restoreToken({ token: userToken }));
    };

    bootstrapAsync();
  }, []);

  if (authState.loading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            {authState.token == null ? (
              <>
                <Stack.Screen
                  name="GettingStartedScreen"
                  component={GettingStartedScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <Stack.Screen
                name="IndexTabs"
                component={IndexTabs}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
