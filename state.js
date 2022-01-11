import axios from "axios";
import { atom, selector } from "recoil";
import { SERVER } from "./api";

export const userIdState = atom({
  key: "userIdState",
  default: 0,
});

export const emotionState = atom({
  key: "EmotionState",
  default: selector({
    key: "EmotionState/Default",
    get: async ({ get }) =>
      await axios.get(`${SERVER}/emotions/${get(userIdState)}`),
  }),
});
