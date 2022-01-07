import React, { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import { activitiesDB } from "../db";
import Flat from "../components/Flat";
import { Button } from "react-native";
import DialogInput from "react-native-dialog-input";

const Activity = () => {
  const [visible, setVisible] = useState(false);

  const addActivity = async (inputText) => {
    console.log("활동입니다 : ", inputText);

    setVisible(false);
  };

  return (
    <ScreenContainer>
      <Flat data={activitiesDB} from="Activity" />
      <Button title="추가" onPress={() => setVisible(true)}></Button>
      <DialogInput
        isDialogVisible={visible}
        title={"활동"}
        message={`추가할 활동을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(inputText) => {
          addActivity(inputText);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      />
    </ScreenContainer>
  );
};

export default Activity;
