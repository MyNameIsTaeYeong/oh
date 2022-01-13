import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 6;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="black" />
    </Container>
  );
};

export default Loader;
