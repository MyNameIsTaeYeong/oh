import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Statistics from "../pages/Share";
import Emotion from "../pages/Emotion";
import Activity from "../pages/Activity";
import { Feather, MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import Etc from "../pages/Etc";

const Tab = createBottomTabNavigator();

const Tabs = ({ setIsLogIn }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        children={() => <Home setIsLogIn={setIsLogIn} />}
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="감정"
        children={() => <Emotion setIsLogIn={setIsLogIn} />}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="insert-emoticon" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="활동"
        children={() => <Activity setIsLogIn={setIsLogIn} />}
        options={{
          tabBarIcon: () => <Feather name="activity" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="공유"
        component={Statistics}
        options={{
          tabBarIcon: () => (
            <AntDesign name="sharealt" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="기타"
        children={() => <Etc setIsLogIn={setIsLogIn} />}
        options={{
          tabBarIcon: () => (
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
