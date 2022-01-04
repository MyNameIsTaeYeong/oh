import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  background-color: gray;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 10px;
`;

const CardName = styled.Text`
  font-size: 30px;
`;

const Card = ({ name }) => {
  console.log(name);
  return (
    <Container>
      <CardName>{name}</CardName>
    </Container>
  );
};

export default Card;
