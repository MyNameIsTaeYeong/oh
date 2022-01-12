import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SERVER } from "../api";
import Flat from "../components/Flat";
import ScreenContainer from "../components/ScreenContainer";
import { activityState, emotionState, userIdState } from "../state";

const Home = () => {
  const userId = useRecoilValue(userIdState);
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const [activities, setActivities] = useRecoilState(activityState);

  useEffect(async () => {
    const res = await Promise.all([
      axios.get(`${SERVER}/emotions/${userId}`),
      axios.get(`${SERVER}/activities/${userId}`),
    ]);
    setEmotions(res[0].data);
    setActivities(res[1].data);
  }, []);

  return (
    <ScreenContainer>
      <Flat
        title={"감정 기록하기"}
        data={emotions}
        horizontal={true}
        from={"home"}
      />
      <Flat
        title={"활동 기록하기"}
        data={activities}
        horizontal={true}
        from={"home"}
      />
    </ScreenContainer>
  );
};

export default Home;
