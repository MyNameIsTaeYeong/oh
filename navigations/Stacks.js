import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalScreen from "../screens/ModalScreen";

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ModalScreen" component={ModalScreen} />
    </Stack.Navigator>
  );
};

export default Stacks;
