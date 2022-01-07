import React, { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import { emotionsDB } from "../db";
import Flat from "../components/Flat";
import { Button } from "react-native";
import DialogInput from "react-native-dialog-input";

const Emotion = () => {
  const [visible, setVisible] = useState(false);

  const addEmotion = async (inputText) => {
    console.log("감정입니다 : ", inputText);

    setVisible(false);
  };

  return (
    <ScreenContainer>
      <Flat data={emotionsDB} from="Emotion" />
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
