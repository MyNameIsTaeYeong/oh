import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./navigations/Root";
import Login from "./pages/Login";
import { ThemeProvider } from "styled-components/native";
import * as SplashScreen from "expo-splash-screen";
import kakaoApi from "./kakaoApi";
import { appTheme } from "./styled";
import { useSetRecoilState } from "recoil";
import { userEmailState, userIdState } from "./state";
import { getSomething, getUsers } from "./api";
import { getProfile } from "@react-native-seoul/naver-login";
import * as SecureStore from "expo-secure-store";

const Oh = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const setUserId = useSetRecoilState(userIdState);
  const setUserEmail = useSetRecoilState(userEmailState);

  const prepare = async () => {
    await SplashScreen.preventAutoHideAsync();

    // await SecureStore.deleteItemAsync("naverToken");
    // await SecureStore.deleteItemAsync("kakaoToken");

    const kakaoToken = await SecureStore.getItemAsync("kakaoToken");
    const naverToken = await SecureStore.getItemAsync("naverToken");
    if (kakaoToken || naverToken) {
      const email = kakaoToken
        ? await kakaoApi.getProfile()
        : (await getProfile(naverToken)).response.email;
      const res = await getUsers(email);
      if (res !== 500) {
        setUserId(res.data.id);
        setUserEmail(email);
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
