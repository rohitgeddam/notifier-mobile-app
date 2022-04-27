import { Provider } from "react-redux";
import { store } from "./store";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GettingStartedScreen from "./screens/GettingStarted";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "./slice/authSlice";

export default function IndexScreen() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  //   const [isLoading, setIsLoading]= useState(false)

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log("USER TOKEN", userToken);
        console.log("AUTH TOKEN", authState)
      } catch (e) {
          console.log(e)
      }
      dispatch(restoreToken({token: userToken}));
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
                name="HomeScreen"
                component={HomeScreen}
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
