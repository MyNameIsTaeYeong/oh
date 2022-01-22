import React from "react";
import { LogBox } from "react-native";
import { RecoilRoot } from "recoil";
import Oh from "./Oh";

LogBox.ignoreLogs(["timer"]);

const App = () => {
  return (
    <RecoilRoot>
      <Oh />
    </RecoilRoot>
  );
};

export default App;
