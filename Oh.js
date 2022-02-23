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
import { getUsers } from "./api";
import { getProfile } from "@react-native-seoul/naver-login";
import * as SecureStore from "expo-secure-store";

const Oh = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const setUserId = useSetRecoilState(userIdState);
  const setUserEmail = useSetRecoilState(userEmailState);

  // const tokenCheck = async (name) => {
  //   const kakaoToken = await SecureStore.getItemAsync(name);
  //   if (!kakaoToken || !kakaoToken.refreshTokenExpiresAt) {
  //     return false;
  //   }
  //   const currentDateTime = new Date(
  //     Date.now() - new Date().getTimezoneOffset() * 60000
  //   )
  //     .toISOString()
  //     .replace("T", " ")
  //     .substring(0, 19);

  //   // 토큰만료 체크
  //   if (currentDateTime >= kakaoToken.refreshTokenExpiresAt) {
  //     return false;
  //   }

  //   return true;
  // };

  const prepare = async () => {
    await SplashScreen.preventAutoHideAsync();

    // await SecureStore.deleteItemAsync("naverToken");
    // await SecureStore.deleteItemAsync("kakaoToken");

    const kakaoCheck = await SecureStore.getItemAsync("kakaoToken");
    if (kakaoCheck) {
      const email = await kakaoApi.getProfile();
      const res = await getUsers(email);
      if (res !== 500) {
        setUserId(res.data);
        setUserEmail(email);
        setIsLogIn(true);
      }
    } else {
      const naverToken = await SecureStore.getItemAsync("naverToken");

      if (naverToken) {
        const {
          response: { email },
        } = await getProfile(naverToken);
        const res = await getUsers(email);
        if (res !== 500) {
          setUserId(res.data);
          setUserEmail(email);
          setIsLogIn(true);
        }
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
