import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalScreen from "../screens/ModalScreen";
import { Alert, Button, View } from "react-native";
import DialogInput from "react-native-dialog-input";

const Stack = createNativeStackNavigator();

const Stacks = ({ route }) => {
  const deleteCheck = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
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
