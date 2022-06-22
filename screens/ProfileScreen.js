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
  useWindowDimensions,
} from "react-native";

import {
  PRIMARY_BTN_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_DARK_COLOR,
  API_URL,
} from "../constants";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";
import { logout } from "../slice/authSlice";

import avatarPlaceholderImg from "../images/avatar.png";
import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    return state.auth;
  });
  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(e);
    }
    dispatch(logout());
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/v1/me/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + authState.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserInfo(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  if (userInfo == null || isLoading) {
    return <ActivityIndicator size="large" color={{ PRIMARY_BTN_COLOR }} />;
  }
  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <Text style={styles.topContainerHeading}>Profile</Text>
        <Image style={styles.profilePhoto} source={avatarPlaceholderImg} />
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Text style={styles.detailHeader}>
            <IonIcon name="person" size={30} color={PRIMARY_BACKGROUND_COLOR} />{" "}
            Account Info
          </Text>

          <View style={styles.microDetailContainer}>
            <Text style={{ fontWeight: "600" }}>Username</Text>
            <Text>{userInfo["username"]}</Text>
          </View>

          <View style={styles.microDetailContainer}>
            <Text style={{ fontWeight: "600" }}>Email</Text>
            <Text>{userInfo["email"]}</Text>
          </View>

          <View style={styles.microDetailContainer}>
            <Text style={{ fontWeight: "600" }}>Batch</Text>
            {userInfo["batch"] ? (
              <Text>{userInfo["batch"]}</Text>
            ) : (
              <Text>Not Given</Text>
            )}
          </View>

          <View style={styles.microDetailContainer}>
            <Text style={{ fontWeight: "600" }}>Phone Number</Text>
            {userInfo["phone_number"] ? (
              <Text>{userInfo["phone_number"]}</Text>
            ) : (
              <Text>Not Given</Text>
            )}
          </View>
        </View>
        {/* Settings  */}
        <View>
          <Text style={styles.detailHeader}>
            <IonIcon
              name="settings"
              size={30}
              color={PRIMARY_BACKGROUND_COLOR}
            />{" "}
            Settings
          </Text>

          <View style={styles.microDetailContainer}>
            <Text style={{ fontWeight: "600" }}>
              Receive email notification
            </Text>
            {userInfo["receive_email_notification"] ? (
              <Text>Yes</Text>
            ) : (
              <Text>No</Text>
            )}
          </View>

          <View style={styles.microDetailContainer}>
            <Text style={{ fontWeight: "600" }}>Receive sms notification</Text>
            {userInfo["receive_sms_notification"] ? (
              <Text>Yes</Text>
            ) : (
              <Text>No</Text>
            )}
          </View>
        </View>

        <Pressable
          onPress={(e) => {
            doLogout();
          }}
          style={styles.logoutBtn}
        >
          <Text
            style={{ color: "white", textAlign: "center", letterSpacing: 2 }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: PRIMARY_BACKGROUND_DARK_COLOR,
    height: "25%",
    borderBottomLeftRadius: 800,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  logoutBtn: {
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    padding: 8,
    borderRadius: 8,
  },
  topContainerHeading: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  profilePhoto: {
    position: "absolute",
    bottom: -40,
    left: "50%",
    transform: [{ translateX: -50 }],
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  detailContainer: {
    marginVertical: 8,
    padding: 32,
    paddingBottom: 60,
  },

  detailHeader: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },

  microDetailContainer: {
    margin: 0,
    padding: 16,
  },
});
