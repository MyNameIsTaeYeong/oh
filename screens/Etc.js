import React from "react";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import kakaoApi from "../kakaoApi";

const Body = styled.View``;

const LogOutBtn = styled.Button``;

const Etc = ({ setIsLogIn }) => {
  const kakaoLogOut = async () => {
    await kakaoApi.kakaoLogOut();
    setIsLogIn(false);
  };

  return (
    <ScreenContainer>
      <Body>
        <LogOutBtn title="로그아웃" onPress={kakaoLogOut} />
      </Body>
    </ScreenContainer>
  );
};

export default Etc;
