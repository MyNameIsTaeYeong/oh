import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

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

const Card = ({ name, id }) => {
  const navigation = useNavigation();

  const aa = () => {
    navigation.navigate("Stacks", {
      screen: "ModalScreen",
    });
  };

  const apiCall = () => {
    console.log("api호출");
  };

  return (
    <Container onPress={aa}>
      <CardName>{name}</CardName>
    </Container>
  );
};

export default Card;
