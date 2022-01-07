import React, { useState } from "react";
import Loader from "../components/Loader";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import { FlatList, ScrollView, Text } from "react-native";

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const Body = styled.ScrollView`
  flex: 6;
`;

const ModalScreen = ({ route: { params } }) => {
  // server/EmoOccurrences/{userId}/ActOccurrences POST 호출
  // params.id, params.name, params.from

  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScreenContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <Body>
          <Text>haha</Text>
          <Text>haha</Text>
          <Text>haha</Text>
          <Text>haha</Text>
          <Text>haha</Text>
          <Text>haha</Text>
          <Text>haha</Text>
        </Body>
      )}
    </ScreenContainer>
  );
};

export default ModalScreen;
