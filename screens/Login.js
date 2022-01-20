import React from "react";
import { Alert, Platform } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import kakaoApi from "../kakaoApi";
import styled from "styled-components/native";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../state";
import { postUesers } from "../api";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import * as SecureStore from "expo-secure-store";

const Oh = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const AppName = styled.Text`
  font-size: 50px;
`;

const Naver = styled.View`
  background-color: green;
  flex: 1;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
`;

const NaverLoginBtn = styled.Button`
  background-color: green;
`;

const Kakao = styled.View`
  background-color: yellow;
  flex: 1;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
`;

const KakaoLoginBtn = styled.Button``;

const Footer = styled.View`
  flex: 1;
`;

const Login = ({ setIsLogIn }) => {
  const setUserId = useSetRecoilState(userIdState);

  const iosKeys = {
    kConsumerKey: "OP2iGuM15_BAy7ybzbvZ",
    kConsumerSecret: "y3_xCfbSDk",
    kServiceAppName: "oh(iOS)",
    kServiceAppUrlScheme: "kldjakldqdj1d21",
  };

  const androidKeys = {
    kConsumerKey: "1SXbQgDD2hsM6zjF1XMG",
    kConsumerSecret: "jaIW4fouG1",
    kServiceAppName: "oh(iOS)",
  };

  const naverLogin = () => {
    NaverLogin.login(
      Platform.OS === "ios" ? iosKeys : androidKeys,
      async (err, token) => {
        if (err) {
          console.log(err);
          return;
        }
        await SecureStore.setItemAsync("naverToken", token.accessToken);
        const {
          response: { email },
        } = await getProfile(token.accessToken);
        const res = await postUesers({ email });
        if (res !== 500) {
          setUserId(res.data);
          setIsLogIn(true);
        }
        if (res === 500) {
          Alert.alert("잠시후 다시 시도해주세요");
        }
      }
    );
  };

  const kakaoLogIn = async () => {
    await kakaoApi.signInWithKakao();

    // 이미 회원가입이 되어있는지 체크하기.

    const email = await kakaoApi.getProfile();

    const res = await postUesers({ email });

    if (res !== 500) {
      setUserId(res.data);
      setIsLogIn(true);
    }
    if (res === 500) {
      Alert.alert("잠시후 다시 시도해주세요");
    }
  };

  return (
    <ScreenContainer>
      <Oh>
        <AppName>oh!</AppName>
      </Oh>
      <Naver>
        <NaverLoginBtn title="네이버로 로그인" onPress={naverLogin} />
      </Naver>
      <Kakao>
        <KakaoLoginBtn title="카카오 로그인" onPress={kakaoLogIn} />
      </Kakao>
      <Footer></Footer>
    </ScreenContainer>
  );
};

export default Login;
