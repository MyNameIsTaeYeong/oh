import React, { useState } from "react";
import { Alert, FlatList } from "react-native";
import DialogInput from "react-native-dialog-input";
import { useRecoilState, useRecoilValue } from "recoil";
import { emotionState, userIdState } from "../state";
import { logOut, postSomething } from "../api";
import styled from "styled-components/native";
import Btn from "../components/Btn";
import Card from "../components/Card";

const Container = styled.View`
  height: ${(props) => props.theme.height};
  background-color: ${(props) => props.theme.bgColor};
  opacity: ${(props) => props.theme.opacity};
  align-items: center;
  padding: 15px;
`;

const VSepa = styled.View`
  height: 20px;
`;

const Emotion = ({ setIsLogIn }) => {
  const [visible, setVisible] = useState(false);
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const userId = useRecoilValue(userIdState);

  const postEmotions = async (inputText) => {
    const res = await postSomething("emotions", {
      name: inputText,
      userId,
    });
    if (res === "logOut") {
      logOut();
      setIsLogIn(false);
    } else {
      if (res.status === 200) {
        setEmotions([
          { id: res.data.insertId, name: inputText, userId },
          ...emotions,
        ]);
        setVisible(false);
      }
      if (res.status === 500) {
        Alert.alert("잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={emotions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            id={item.id}
            from={"Emotion"}
            setIsLogIn={setIsLogIn}
          />
        )}
        ItemSeparatorComponent={() => <VSepa />}
      />
      <Btn title={"추가"} whatToDo={() => setVisible(true)} />
      <DialogInput
        isDialogVisible={visible}
        title={"감정"}
        message={`추가할 감정을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(inputText) => {
          postEmotions(inputText);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      />
    </Container>
  );
};

export default Emotion;
