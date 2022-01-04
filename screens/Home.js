import React from "react";
import styled from "styled-components/native";
import HFlat from "../components/HFlat";

const Container = styled.View``;

const Home = () => {
  const emotionsDB = [
    { id: 1, name: "기쁨", userId: 1 },
    { id: 2, name: "슬픔", userId: 1 },
    { id: 3, name: "분노", userId: 1 },
  ];

  const activitiesDB = [
    { id: 1, name: "수면부족", userId: 1 },
    { id: 2, name: "운동", userId: 1 },
    { id: 3, name: "독서", userId: 1 },
    { id: 4, name: "설거지", userId: 1 },
  ];

  return (
    <Container>
      <HFlat title={"감정"} data={emotionsDB} />
      <HFlat title={"활동"} data={activitiesDB} />
    </Container>
  );
};

export default Home;
