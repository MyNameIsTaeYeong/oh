import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalScreen from "../pages/ModalScreen";
import { Alert, Button } from "react-native";
import { deleteSomething } from "../api";
import { useRecoilState } from "recoil";
import { activityState, emotionState } from "../state";
import { go, filter } from "fxjs";

const Stack = createNativeStackNavigator();

const Stacks = ({ route, navigation }) => {
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const [activities, setActivities] = useRecoilState(activityState);

  const deleteApiCall = async () => {
    const { name, id, from } = route.params.params;

    if (from === "Emotion") {
      const res = await deleteSomething("emotions", id);
      return res.status;
    } else {
      const res = await deleteSomething("activities", id);
      return res.status;
    }
  };

  const deleteCheck = () => {
    const { name, id, from } = route.params.params;
    Alert.alert(name, `${name}을 삭제하시겠습니까?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: async () => {
          const status = await deleteApiCall();
          if (status === 200) {
            Alert.alert("삭제되었습니다.");
            navigation.goBack();
            from === "Emotion"
              ? go(
                  emotions,
                  filter((emotion) => emotion.id != id),
                  setEmotions
                )
              : go(
                  activities,
                  filter((activity) => activity.id != id),
                  setActivities
                );
          } else {
            Alert.alert("잠시 후 다시 시도해주세요.");
          }
        },
      },
    ]);
  };

  return (
    <Stack.Navigator screenOptions={{ title: route.params.params.name }}>
      <Stack.Screen
        name="ModalScreen"
        component={ModalScreen}
        options={{
          headerRight: () => <Button title="삭제" onPress={deleteCheck} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
