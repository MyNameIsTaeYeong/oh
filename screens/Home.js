import React from "react";
import { Button } from "react-native";
import Flat from "../components/Flat";
import ScreenContainer from "../components/ScreenContainer";
import { activitiesDB, emotionsDB } from "../db";

const Home = () => {
  return (
    <ScreenContainer>
      <Flat
        title={"감정 기록하기"}
        data={emotionsDB}
        horizontal={true}
        from={"home"}
      />
      <Flat
        title={"활동 기록하기"}
        data={activitiesDB}
        horizontal={true}
        from={"home"}
      />
    </ScreenContainer>
  );
};

export default Home;
