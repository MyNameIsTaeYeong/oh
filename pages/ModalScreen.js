import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ScreenContainer from "../components/ScreenContainer";
import { ScrollView } from "react-native";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdState } from "../state";
import { SERVER } from "../api";
import { go, map } from "fxjs";
import PieChart from "../components/PieChart";

const ModalScreen = ({ route: { params } }) => {
  // params.id, params.name, params.from

  const [isLoading, setIsLoading] = useState(true);
  const userId = useRecoilValue(userIdState);
  const [emotionData, setEmotionData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  const apiCall = async (url, body) => {
    try {
      const res = await axios.post(url, body);
      if (res.status === 200) {
        return res;
      } else {
        return 500;
      }
    } catch (error) {
      console.log(error);
      return 500;
    }
  };

  // from = "Emotion" or from = "Activity"
  useEffect(async () => {
    let url, body;
    if (params.from === "Emotion") {
      url = `${SERVER}/EmoOccurrences/${userId}/ActOccurrences`;
      body = {
        emotionName: params.name,
      };
    } else {
      url = `${SERVER}/ActOccurrences/${userId}/EmoOccurrences`;
      body = {
        activityName: params.name,
      };
    }

    const res = await apiCall(url, body);
    if (res.status === 200) {
      go(
        res.data[0].results,
        map((obj) => {
          return {
            x: obj.name,
            y: obj.cnt,
          };
        }),
        setEmotionData
      );

      go(
        res.data[1].results,
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
