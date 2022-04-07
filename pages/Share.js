import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import DialogInput from "react-native-dialog-input";
import ScreenContainer from "../components/ScreenContainer";
import { AntDesign } from "@expo/vector-icons";
import Btn from "../components/Btn";
import styled from "styled-components/native";

const data = [
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 0, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 2, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 3, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 4, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 5, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 6, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 7, userId: 10 },
  { content: "이럴때 ~ 이러하다 ~", like: 100, id: 8, userId: 10 },
];

const Container = styled.View`
  height: ${(props) => props.theme.height};
  background-color: ${(props) => props.theme.bgColor};
  opacity: ${(props) => props.theme.opacity};
  padding: 15px;
`;

const VSepa = styled.View`
  height: 20px;
`;

const Share = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
            <Text>{item.like}</Text>
            <TouchableOpacity>
              <AntDesign name="like2" size={24} color="black" />
              <AntDesign name="like1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <VSepa />}
      />
      <Btn title={"공유하기"} whatToDo={() => setVisible(true)} />
      <DialogInput
        isDialogVisible={visible}
        title={"공유"}
        message={`공유할 내용을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(inputText) => {
          postActivities(inputText);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      />
    </Container>
  );
};

export default Share;
