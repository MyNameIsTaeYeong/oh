import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ScreenContainer from "../components/ScreenContainer";
import styled from "styled-components/native";
import { VictoryPie } from "victory-native";
import { ScrollView, View } from "react-native";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdState } from "../state";
import { SERVER } from "../api";
import { go, map } from "fxjs";

const Title = styled.Text`
  margin: 20px;
  font-size: 15px;
`;

const ModalScreen = ({ route: { params } }) => {
  // server/EmoOccurrences/{userId}/ActOccurrences POST 호출
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
    console.log(res);
    if (res.status === 200) {
      go(
        res.data[0],
        map((obj) => {
          return {
            x: obj.name,
            y: obj.cnt,
          };
        }),
        setEmotionData
      );

      go(
        res.data[1],
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

  // const generateColor = () => {
  //   const randomColor = Math.floor(Math.random() * 16777215)
  //     .toString(16)
  //     .padStart(6, "0");
  //   return `#${randomColor}`;
  // };

  return (
    <ScreenContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <VictoryPie
              animate={{ easing: "exp" }}
              data={emotionData}
              innerRadius={20}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#fff",
                  strokeWidth: 2,
                },
                labels: {
                  fill: "#212121",
                },
              }}
            />
            <Title>{params.name}(와)과 같은날 발생했던 감정</Title>
            <VictoryPie
              animate={{ easing: "exp" }}
              data={activityData}
              innerRadius={20}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#fff",
                  strokeWidth: 2,
                },
                labels: {
                  fill: "#212121",
                },
              }}
            />
            <Title>{params.name}(와)과 같은날 발생했던 활동</Title>
          </View>
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

export default ModalScreen;
