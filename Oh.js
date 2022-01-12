import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./navigations/Root";
import Login from "./screens/Login";
import { ThemeProvider } from "styled-components/native";
import * as SplashScreen from "expo-splash-screen";
import MMKVStorage from "react-native-mmkv-storage";
import kakaoApi from "./kakaoApi";
import { appTheme } from "./styled";
import { useSetRecoilState } from "recoil";
import { userIdState } from "./state";
import { getUsers } from "./api";

const Oh = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const setUserId = useSetRecoilState(userIdState);

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
      const res = await getUsers(email);
      if (res !== 500) {
        setUserId(res.data);
        setIsLogIn(true);
      }
    }
  };

  useEffect(async () => {
    await prepare();
    await SplashScreen.hideAsync();
  }, []);

  return isLogIn ? (
    <ThemeProvider theme={appTheme}>
      <NavigationContainer>
        <RootNav setIsLogIn={setIsLogIn} />
      </NavigationContainer>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={appTheme}>
      <Login setIsLogIn={setIsLogIn} />
    </ThemeProvider>
  );
};

export default Oh;
