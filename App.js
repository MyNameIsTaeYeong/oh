import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./navigations/Tabs";
import RootNav from "./navigations/Root";

export default function App() {
  return (
    <NavigationContainer>
      <RootNav />
    </NavigationContainer>
  );
}
