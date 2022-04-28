import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  TextInput,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slice/authSlice";

import {
  PRIMARY_BTN_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  API_URL,
} from "../constants";
import * as Animatable from "react-native-animatable";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  // const loading = useSelector((state) => state.auth.login);

  const [isLoading, setIsLoading] = useState(false);

  const [authDetails, setAuthDetails] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginDetailValidation = () => {
    if (authDetails.username === "" || authDetails.password === "") {
      setError("* Fields cannot be empty.");
      return false;
    }

    return true;
  };

  const doLogin = () => {
    if (loginDetailValidation()) {
      setIsLoading(true);
      setError("");

      fetch(`${API_URL}/api/v1/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authDetails),
      })
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          if (data["token"]) {
            dispatch(login(data["token"]));
            try {
              await AsyncStorage.setItem("userToken", data["token"]);
            } catch (e) {}
          }

          if (data["non_field_errors"] && data["non_field_errors"][0]) {
            setError(data["non_field_errors"][0]);
          }
        })
        .catch((err) => {
          setError("Something went wrong. Please try again later.");
          setIsLoading(false);
        })
    }
  };

  return (
    <View style={styles.container}>
      
      <Animatable.View style={styles.innerContainer} animation="fadeInUpBig">
        {/* <View style={styles.authDetailsContainer}> */}
        <View style={{ marginBottom: 8, width: "100%" }}>
          <Text style={{ marginBottom: 8, marginLeft: 8, fontWeight: "bold" }}>
            Username
          </Text>

          <TextInput
            style={styles.userInput}
            placeholder="Enter your username"
            autoCapitalize="none"
            onChangeText={(text) =>
              setAuthDetails({ ...authDetails, username: text })
            }
            value={authDetails.username}
          />
        </View>

        <View style={{ marginBottom: 8, width: "100%" }}>
          <Text style={{ marginBottom: 8, marginLeft: 8, fontWeight: "bold" }}>
            Password
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) =>
              setAuthDetails({ ...authDetails, password: text })
            }
            value={authDetails.password}
          />
          <View>
            <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
          </View>
        </View>
        {/* </View> */}

        <Pressable style={styles.button} onPress={doLogin}>
        {
          isLoading ? (
          <ActivityIndicator size="small" color={{PRIMARY_BTN_COLOR}} style={styles.btnText}/>
          ): 
          <Text style={styles.btnText}>Login</Text>
          
          }
        </Pressable>

        <Text
          style={{
            fontSize: 14,
            color: PRIMARY_BACKGROUND_COLOR,
            marginTop: 8,
          }}
        >
          Note: If you forgot your password, contact the admin.
        </Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  authDetailsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: 50,
    borderWidth: 1,
    alignItems: "flex-start",
    marginTop: 24,
    padding: 8,
  },
  innerContainer: {
    display: "flex",
    height: "70%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,

    padding: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: PRIMARY_BTN_COLOR,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "100%",
    borderRadius: 10,
    marginTop: 16,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  infoText: {
    color: "#9586A8",
    marginBottom: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  userInput: {
    borderWidth: 1,
    padding: 16,
    fontSize: 14,
    width: "100%",
    borderRadius: 24,
    borderColor: PRIMARY_BACKGROUND_COLOR,
  },
});
