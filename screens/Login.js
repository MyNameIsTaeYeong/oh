import React from "react";
import { Button, View } from "react-native";
import kakaoApi from "../kakaoApi";

const Login = ({ setIsLogIn }) => {
  const kakaoLogIn = async () => {
    await kakaoApi.signInWithKakao();
    setIsLogIn(true);
  };

  const kakaoLogOut = async () => {
    await kakaoApi.kakaoLogOut();
    setIsLogIn(false);
  };

  return (
    <View>
      <Button title="카카오 로그인"></Button>
      <Button title="카카오 로그인" onPress={kakaoLogIn}></Button>
      <Button title="로그아웃" onPress={kakaoLogOut}></Button>
      <Button title="프로파일" onPress={kakaoApi.getProfile}></Button>
    </View>
  );
};

export default Login;
