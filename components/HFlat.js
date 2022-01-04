import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Card from "./Card";

const Container = styled.View`
  padding: 15px;
`;
const Title = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
`;
const Hsepa = styled.View`
  width: 10px;
`;

const HFlat = ({ title, data }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card name={item.name} />}
        horizontal
        ItemSeparatorComponent={() => <Hsepa />}
      />
    </Container>
  );
};

export default HFlat;
