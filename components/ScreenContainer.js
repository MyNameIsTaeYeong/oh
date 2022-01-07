import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  height: ${(props) => props.theme.height};
  background-color: ${(props) => props.theme.bgColor};
  opacity: ${(props) => props.theme.opacity};
`;

const ScreenContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ScreenContainer;
