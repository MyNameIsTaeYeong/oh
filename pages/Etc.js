import React from "react";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../state";
import { logOut } from "../api";
import Btn from "../components/Btn";

const Body = styled.View``;

const UserEmail = styled.Text``;

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
        <Btn title="로그아웃" whatToDo={bye} />
      </Body>
    </ScreenContainer>
  );
};

export default Etc;
