import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "../components/Loader";
import styled from "styled-components/native";
import { activityState, emotionState, userIdState } from "../state";
import { getSomething, logOut } from "../api";
import Card from "../components/Card";
import { FlatList } from "react-native";

const Container = styled.View`
  height: ${(props) => props.theme.height};
  background-color: ${(props) => props.theme.bgColor};
  opacity: ${(props) => props.theme.opacity};
`;

const FlatContainer = styled.View`
  padding: 15px;
  align-items: center;
`;

const Title = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const HSepa = styled.View`
  width: 10px;
`;

const Home = ({ setIsLogIn }) => {
  const userId = useRecoilValue(userIdState);
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const [activities, setActivities] = useRecoilState(activityState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await Promise.all([
      getSomething("emotions", userId),
      getSomething("activities", userId),
    ]);

    if (res[0] === "logOut" || res[1] === "logOut") {
      logOut();
      setIsLogIn(false);
    }

    if (res[0].data.results && res[1].data.results) {
      setEmotions(res[0].data.results);
      setActivities(res[1].data.results);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <FlatContainer>
        <Title>{"감정 기록하기"}</Title>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={emotions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              id={item.id}
              from={"homeEmo"}
              setIsLogIn={setIsLogIn}
            />
          )}
          ItemSeparatorComponent={() => <HSepa />}
          horizontal={true}
        />
      </FlatContainer>
      <FlatContainer>
        <Title>{"활동 기록하기"}</Title>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              id={item.id}
              from={"homeAct"}
              setIsLogIn={setIsLogIn}
            />
          )}
          ItemSeparatorComponent={() => <HSepa />}
          horizontal={true}
        />
      </FlatContainer>
    </Container>
  );
};

export default Home;
