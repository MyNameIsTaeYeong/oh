import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./navigations/Tabs";
import RootNav from "./navigations/Root";
import Login from "./screens/Login";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 50px;
`;

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    return (
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    );
  } else {
    return (
      <Container>
        <Login />
      </Container>
    );
  }
}
