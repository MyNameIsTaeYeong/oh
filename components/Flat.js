import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Card from "./Card";

const Container = styled.View`
  padding: 15px;
  align-items: center;
`;

const Title = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const VSepa = styled.View`
  height: 20px;
`;

const HSepa = styled.View`
  width: 10px;
`;

const Flat = ({ title, data, horizontal, from, setIsLogIn }) => {
  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            id={item.id}
            from={from}
            setIsLogIn={setIsLogIn}
          />
        )}
        ItemSeparatorComponent={() => (horizontal ? <HSepa /> : <VSepa />)}
        horizontal={horizontal}
      />
    </Container>
  );
};

export default Flat;
