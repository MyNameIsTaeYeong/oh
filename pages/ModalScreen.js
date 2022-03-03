import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ScreenContainer from "../components/ScreenContainer";
import { ScrollView } from "react-native";
import { useRecoilValue } from "recoil";
import { userIdState } from "../state";
import { postSomething } from "../api";
import { go, map } from "fxjs";
import PieChart from "../components/PieChart";

const ModalScreen = ({ route: { params } }) => {
  // params.id, params.name, params.from

  const [isLoading, setIsLoading] = useState(true);
  const userId = useRecoilValue(userIdState);
  const [emotionData, setEmotionData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  // from = "Emotion" or from = "Activity"
  useEffect(async () => {
    let resource, body;
    if (params.from === "Emotion") {
      resource = `EmoOccurrences/${userId}/ActOccurrences`;
      body = {
        emotionName: params.name,
      };
    } else {
      resource = `ActOccurrences/${userId}/EmoOccurrences`;
      body = {
        activityName: params.name,
      };
    }

    const res = await postSomething(resource, body);

    if (res.status === 200) {
      go(
        res.data.results[0],
        map((obj) => {
          return {
            x: obj.name,
            y: obj.cnt,
          };
        }),
        setEmotionData
      );

      go(
        res.data.results[1],
        map((obj) => {
          return {
            x: obj.name,
            y: obj.cnt,
          };
        }),
        setActivityData
      );
      setIsLoading(false);
    }
  }, []);

  return (
    <ScreenContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <PieChart data={emotionData} title={params.name} subTitle={"감정"} />
          <PieChart data={activityData} title={params.name} subTitle={"활동"} />
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

export default ModalScreen;
