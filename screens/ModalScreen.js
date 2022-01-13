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

const ModalScreen = ({ route: { params } }) => {
  // server/EmoOccurrences/{userId}/ActOccurrences POST 호출
  // params.id, params.name, params.from

  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const userId = useRecoilValue(userIdState);

  useEffect(async () => {
    const res = await axios.post(
      `${SERVER}/EmoOccurrences/${userId}/ActOccurrences`,
      {
        emotionName: params.name,
      }
    );
    go(
      res.data[0],
      map((obj) => {
        return {
          x: obj.name,
          y: obj.cnt,
        };
      }),
      setData1
    );

    setIsLoading(false);
    //console.log(res.data[0]);
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
          <View style={{ justifyContent: "center" }}>
            <VictoryPie
              animate={{ easing: "exp" }}
              data={data1}
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
          </View>
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

export default ModalScreen;
