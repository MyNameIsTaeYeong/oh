import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stacks from "./Stacks";
import ModalScreen from "../screens/ModalScreen";
import { useRecoilValue } from "recoil";
import { userIdState } from "../state";

const Nav = createNativeStackNavigator();

const RootNav = ({ setIsLogIn }) => {
  const userId = useRecoilValue(userIdState);
  console.log(userId);
  return (
    <Nav.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Nav.Screen
        name="Tabs"
        children={() => <Tabs setIsLogIn={setIsLogIn} />}
      />
      <Nav.Screen name="Stacks" component={Stacks} />
    </Nav.Navigator>
  );
};

export default RootNav;
