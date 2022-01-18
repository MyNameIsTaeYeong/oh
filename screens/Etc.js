import React from "react";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import kakaoApi from "../kakaoApi";
import MMKVStorage from "react-native-mmkv-storage";
import { NaverLogin } from "@react-native-seoul/naver-login";

const Body = styled.View``;

const LogOutBtn = styled.Button``;

const Etc = ({ setIsLogIn }) => {
  const MMKV = new MMKVStorage.Loader().initialize();

  const logOut = async () => {
    let token = await MMKV.getMapAsync("kakaoToken");
    if (token != null) {
      await kakaoApi.kakaoLogOut();
      MMKV.removeItem("kakaoToken");
      setIsLogIn(false);
    } else {
      NaverLogin.logout();
      MMKV.removeItem("naverToken");
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
