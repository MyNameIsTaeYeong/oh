import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { postSomething } from "../api";
import { userIdState } from "../state";
import Loader from "./Loader";

const Container = styled.TouchableOpacity`
  background-color: #ef8316;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 10px;
`;

const CardName = styled.Text`
  font-size: 20px;
  color: black;
`;

const Card = ({ name, id, from }) => {
  const navigation = useNavigation();
  const [waiting, setWaiting] = useState(false);
  const userId = useRecoilValue(userIdState);

  const openModal = () => {
    navigation.navigate("Stacks", {
      screen: "ModalScreen",
      params: {
        id,
        name,
        from,
      },
    });
  };

  //body : { emotionName: "안기쁨", userId: 1 }
  const postOccurs = async () => {
    setWaiting(true);
    let res;
    if (from === "homeEmo") {
      res = await postSomething("EmoOccurrences", {
        emotionName: name,
        userId,
      });
    } else {
      res = await postSomething("ActOccurrences", {
        activityName: name,
        userId,
      });
    }
    if (res.status === 200) {
      Alert.alert("기록되었습니다!");
    } else {
      Alert.alert("잠시 후 다시 시도해주세요.");
    }
    setWaiting(false);
  };

  return (
    <Container
      onPress={
        from === "homeEmo" || from === "homeAct" ? postOccurs : openModal
      }
    >
      {waiting ? <Loader /> : <CardName>{name}</CardName>}
    </Container>
  );
};

export default Card;
