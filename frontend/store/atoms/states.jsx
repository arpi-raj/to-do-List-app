import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const token = atom({
  key: "token",
  default: "",
});

export const todoState = atom({
  key: "todoState",
  default: [], // Default to an empty array
});

export const userState = atom({
  key: "userState",
  default: {
    userName: "",
    userEmail: "",
  },
  effects_UNSTABLE: [persistAtom],
});
