import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SERVER } from "@env";
import Flat from "../components/Flat";
import Loader from "../components/Loader";
import ScreenContainer from "../components/ScreenContainer";
import { activityState, emotionState, userIdState } from "../state";

const Home = () => {
  const userId = useRecoilValue(userIdState);
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const [activities, setActivities] = useRecoilState(activityState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await Promise.all([
      axios.get(`${SERVER}/emotions/${userId}`),
      axios.get(`${SERVER}/activities/${userId}`),
    ]);
    setEmotions(res[0].data);
    setActivities(res[1].data);
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <ScreenContainer>
      <Flat
        title={"감정 기록하기"}
        data={emotions}
        horizontal={true}
        from={"homeEmo"}
      />
      <Flat
        title={"활동 기록하기"}
        data={activities}
        horizontal={true}
        from={"homeAct"}
      />
    </ScreenContainer>
  );
};

export default Home;
