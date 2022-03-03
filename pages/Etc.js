import React from "react";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../state";
import { logOut } from "../api";

const Body = styled.View``;

const UserEmail = styled.Text``;

const LogOutBtn = styled.Button``;

const Etc = ({ setIsLogIn }) => {
  const email = useRecoilValue(userEmailState);

  const bye = async () => {
    logOut();
    setIsLogIn(false);
  };

  return (
    <ScreenContainer>
      <Body>
        <UserEmail> email : {email}</UserEmail>
        <LogOutBtn title="로그아웃" onPress={bye} />
      </Body>
    </ScreenContainer>
  );
};

export default Etc;
