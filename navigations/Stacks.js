import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalScreen from "../pages/ModalScreen";
import { Alert } from "react-native";
import { deleteSomething } from "../api";
import { useRecoilState } from "recoil";
import { activityState, emotionState } from "../state";
import { go, filter } from "fxjs";
import Btn from "../components/Btn";

const Stack = createNativeStackNavigator();

const Stacks = ({ route, navigation }) => {
  const [emotions, setEmotions] = useRecoilState(emotionState);
  const [activities, setActivities] = useRecoilState(activityState);

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
          const resource = from === "Emotion" ? "emotions" : "activities";
          const res = await deleteSomething(resource, id);
          if (res.status === 200) {
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
          headerRight: () => (
            <Btn title="해당 카드 삭제" whatToDo={deleteCheck} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
