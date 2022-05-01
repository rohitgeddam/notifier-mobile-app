import { Provider } from "react-redux";
import { store } from "./store";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PRIMARY_BACKGROUND_COLOR } from './constants'
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GettingStartedScreen from "./screens/GettingStarted";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import NoticeScreen from "./screens/NoticeScreen";
import EventScreen from "./screens/EventScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "./slice/authSlice";


function IndexTabs(){
  return(
        <Tab.Navigator 
        initialRouteName="Notice"
        screenOptions={ ({ route }) => ({

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Notice') {
              iconName = focused
                ? 'megaphone'
                : 'megaphone-outline';
            } else if (route.name === 'Events') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Jobs') {
              iconName = focused ? 'school' : 'school-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <IonIcon name={iconName} size={size} color={PRIMARY_BACKGROUND_COLOR} />;
          },
          tabBarActiveTintColor: PRIMARY_BACKGROUND_COLOR,
          tabBarInactiveTintColor: 'gray',
          showLabel: false,

        })}>
           <Tab.Screen name="Notice" component={NoticeScreen}  options={{ headerShown: false }}/>

<Tab.Screen name="Events" component={EventScreen}  options={{ headerShown: false }}/>

<Tab.Screen name="Jobs" component={EventScreen}  options={{ headerShown: false }}/>


<Tab.Screen name="Account" component={EventScreen}  options={{ headerShown: false }}/>
        </Tab.Navigator>
  )


}

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
        console.log("AUTH TOKEN", authState);
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
