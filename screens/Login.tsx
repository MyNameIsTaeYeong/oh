import React from "react";

import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import { Button, View } from "react-native";

const Login = () => {
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    console.log(JSON.stringify(token));
  };
  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement =
      await getKakaoProfile();
    console.log(profile);
    //setResult(JSON.stringify(profile));
  };
  return (
    <View>
      <Button title="로그인" onPress={signInWithKakao}></Button>
      <Button title="프로파일" onPress={getProfile}></Button>
    </View>
  );
};

export default Login;
