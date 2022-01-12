import React, { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import Flat from "../components/Flat";
import { Alert, Button } from "react-native";
import DialogInput from "react-native-dialog-input";
import { useRecoilState, useRecoilValue } from "recoil";
import { emotionState, userIdState } from "../state";
import axios from "axios";
import { SERVER } from "../api";

const Emotion = () => {
  const [visible, setVisible] = useState(false);
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const userId = useRecoilValue(userIdState);

  const addEmotion = async (inputText) => {
    const res = await axios.post(`${SERVER}/emotions`, {
      name: inputText,
      userId,
    });
    if (res.status === 200) {
      setEmotions([...emotions, { id: res.data, name: inputText, userId }]);
      setVisible(false);
    }
    if (res.status === 500) {
      Alert.alert("잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <ScreenContainer>
      <Flat data={emotions} from="Emotion" />
      <Button title="추가" onPress={() => setVisible(true)}></Button>
      <DialogInput
        isDialogVisible={visible}
        title={"감정"}
        message={`추가할 감정을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(inputText) => {
          addEmotion(inputText);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      />
    </ScreenContainer>
  );
};

export default Emotion;
