import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Statistics from "../screens/Statistics";
import Emotion from "../screens/Emotion";
import Activity from "../screens/Activity";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
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
    </Tab.Navigator>
  );
};

export default Tabs;
