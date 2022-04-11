import { atom } from "recoil";

export const userEmailState = atom({
  key: "userEmailState",
  default: "ja",
});

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

export const shareTagState = atom({
  key: "shareTagState",
  default: [],
});
