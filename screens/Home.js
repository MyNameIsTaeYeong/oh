import React, { useState } from "react";
import { Alert, Button } from "react-native";
import styled from "styled-components/native";
import HFlat from "../components/HFlat";
import kakaoApi from "../kakaoApi";
import DialogInput from "react-native-dialog-input";

const Container = styled.View``;

const Home = () => {
  const [dialogSate, setDialogSate] = useState(0);

  const emotionsDB = [
    { id: 1, name: "기쁨", userId: 1 },
    { id: 2, name: "슬픔", userId: 1 },
    { id: 3, name: "분노", userId: 1 },
  ];

  const activitiesDB = [
    { id: 1, name: "수면부족", userId: 1 },
    { id: 2, name: "운동", userId: 1 },
    { id: 3, name: "독서", userId: 1 },
    { id: 4, name: "설거지", userId: 1 },
  ];

  const logOut = async () => {
    await kakaoApi.kakaoLogOut();
    setIsLogIn(false);
  };

  const addEmotion = async (inputText) => {
    if (dialogSate == 1) {
      console.log("감정입니다 : ", inputText);
    } else {
      console.log("활동입니다 : ", inputText);
    }

    setDialogSate(0);
  };

  const which = dialogSate == 1 ? "감정" : dialogSate == 2 ? "활동" : "";

  return (
    <Container>
      <HFlat title={"감정"} data={emotionsDB} />
      <Button title="추가" onPress={() => setDialogSate(1)} />
      <DialogInput
        isDialogVisible={dialogSate != 0 ? true : false}
        title={which}
        message={`추가할 ${which}을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(inputText) => {
          addEmotion(inputText);
        }}
        closeDialog={() => {
          setDialogSate(0);
        }}
      />
      <HFlat title={"활동"} data={activitiesDB} />
      <Button title="추가" onPress={() => setDialogSate(2)} />
    </Container>
  );
};

export default Home;
