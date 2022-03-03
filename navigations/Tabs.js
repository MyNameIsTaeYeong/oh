import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Emotion from "../pages/Emotion";
import Activity from "../pages/Activity";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
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
        component={Emotion}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="insert-emoticon" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="활동"
        component={Activity}
        options={{
          tabBarIcon: () => <Feather name="activity" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="보기"
        component={Statistics}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="comment-question-outline"
              size={24}
              color="black"
            />
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
