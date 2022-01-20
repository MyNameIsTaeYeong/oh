import React from "react";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import kakaoApi from "../kakaoApi";
import { NaverLogin } from "@react-native-seoul/naver-login";
import * as SecureStore from "expo-secure-store";

const Body = styled.View``;

const LogOutBtn = styled.Button``;

const Etc = ({ setIsLogIn }) => {
  const logOut = async () => {
    let token = await SecureStore.getItemAsync("kakaoToken");
    if (token != null) {
      await kakaoApi.kakaoLogOut();
      await SecureStore.deleteItemAsync("kakaoToken");
      setIsLogIn(false);
    } else {
      NaverLogin.logout();
      await SecureStore.deleteItemAsync("naverToken");
      setIsLogIn(false);
    }
  };

  return (
    <ScreenContainer>
      <Body>
        <LogOutBtn title="로그아웃" onPress={logOut} />
      </Body>
    </ScreenContainer>
  );
};

export default Etc;
