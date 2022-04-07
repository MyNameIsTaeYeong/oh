import React, { useState } from "react";
import DialogInput from "react-native-dialog-input";
import { useRecoilState, useRecoilValue } from "recoil";
import { activityState, userIdState } from "../state";
import { logOut, postSomething } from "../api";
import Btn from "../components/Btn";
import styled from "styled-components/native";
import { FlatList } from "react-native";
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

const Activity = ({ setIsLogIn }) => {
  const [visible, setVisible] = useState(false);
  const [activities, setActivities] = useRecoilState(activityState);
  const userId = useRecoilValue(userIdState);

  const postActivities = async (inputText) => {
    const res = await postSomething("activities", {
      name: inputText,
      userId,
    });
    if (res === "logOut") {
      logOut();
      setIsLogIn(false);
    } else {
      if (res.status === 200) {
        setActivities([
          ...activities,
          { id: res.data.insertId, name: inputText, userId },
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
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            id={item.id}
            from={"Activity"}
            setIsLogIn={setIsLogIn}
          />
        )}
        ItemSeparatorComponent={() => <VSepa />}
      />

      <Btn title={"추가"} whatToDo={() => setVisible(true)} />
      <DialogInput
        isDialogVisible={visible}
        title={"활동"}
        message={`추가할 활동을 입력하세요.`}
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

export default Activity;
