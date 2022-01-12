import axios from "axios";
import { atom, selector } from "recoil";
import { SERVER } from "./api";

export const userIdState = atom({
  key: "userIdState",
  default: 0,
});

export const emotionState = atom({
  key: "EmotionState",
  default: [],
});

export const activityState = atom({
  key: "activityState",
  default: [],
});
