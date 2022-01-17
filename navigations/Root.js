import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stacks from "./Stacks";

const Nav = createNativeStackNavigator();

const RootNav = ({ setIsLogIn }) => {
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
