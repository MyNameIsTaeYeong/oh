import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 6;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  opacity: 0.5;
`;

const Loader = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="black" />
    </Container>
  );
};

export default Loader;
