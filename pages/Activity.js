import React, { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import Flat from "../components/Flat";
import { Button } from "react-native";
import DialogInput from "react-native-dialog-input";
import { useRecoilState, useRecoilValue } from "recoil";
import { activityState, userIdState } from "../state";
import { logOut, postSomething } from "../api";

const Activity = ({ setIsLogIn }) => {
  const [visible, setVisible] = useState(false);
  const [activities, setActivities] = useRecoilState(activityState);
  const userId = useRecoilValue(userIdState);

  const postActivities = async (inputText) => {
    const res = await postSomething("activities", {
      name: inputText,
      userId,
    });
    if (res === "logOut") {
      logOut();
      setIsLogIn(false);
    } else {
      if (res.status === 200) {
        setActivities([
          ...activities,
          { id: res.data.insertId, name: inputText, userId },
        ]);
        setVisible(false);
      }
      if (res.status === 500) {
        Alert.alert("잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <ScreenContainer>
      <Flat data={activities} from="Activity" setIsLogIn={setIsLogIn} />
      <Button title="추가" onPress={() => setVisible(true)}></Button>
      <DialogInput
        isDialogVisible={visible}
        title={"활동"}
        message={`추가할 활동을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(inputText) => {
          postActivities(inputText);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      />
    </ScreenContainer>
  );
};

export default Activity;
