import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Flat from "../components/Flat";
import Loader from "../components/Loader";
import ScreenContainer from "../components/ScreenContainer";
import { activityState, emotionState, userIdState } from "../state";
import { getSomething, logOut } from "../api";

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
    <ScreenContainer>
      <Flat
        title={"감정 기록하기"}
        data={emotions}
        horizontal={true}
        from={"homeEmo"}
        setIsLogIn={setIsLogIn}
      />
      <Flat
        title={"활동 기록하기"}
        data={activities}
        horizontal={true}
        from={"homeAct"}
        setIsLogIn={setIsLogIn}
      />
    </ScreenContainer>
  );
};

export default Home;
