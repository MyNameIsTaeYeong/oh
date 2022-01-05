import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./navigations/Tabs";
import RootNav from "./navigations/Root";
import Login from "./screens/Login";
import styled from "styled-components/native";
import * as SplashScreen from "expo-splash-screen";
import MMKVStorage from "react-native-mmkv-storage";
import kakaoApi from "./kakaoApi";
import store from "./store";
import { Provider } from "react-redux";

const Container = styled.View`
  margin-top: 50px;
`;

const App = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  const MMKV = new MMKVStorage.Loader().initialize();

  const tokenCheck = async (name) => {
    const kakaoToken = await MMKV.getMapAsync(name);
    if (!kakaoToken || !kakaoToken.refreshTokenExpiresAt) {
      return false;
    }
    const currentDateTime = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    // 토큰만료 체크
    if (currentDateTime >= kakaoToken.refreshTokenExpiresAt) {
      return false;
    }

    return true;
  };

  const prepare = async () => {
    await SplashScreen.preventAutoHideAsync();

    const kakaoCheck = await tokenCheck("kakaoToken");
    if (kakaoCheck) {
      const email = await kakaoApi.getProfile();
      console.log(email);
      setIsLogIn(true);
    }
  };

  useEffect(async () => {
    await prepare();
    await SplashScreen.hideAsync();
  }, []);

  return isLogIn ? (
    <Provider store={store}>
      <NavigationContainer>
        <RootNav setIsLogIn={setIsLogIn} />
      </NavigationContainer>
    </Provider>
  ) : (
    <Provider store={store}>
      <Login setIsLogIn={setIsLogIn} />
    </Provider>
  );
};

export default App;
