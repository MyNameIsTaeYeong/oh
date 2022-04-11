import axios from "axios";
import { SERVER } from "@env";
import * as SecureStore from "expo-secure-store";
import kakaoApi from "./kakaoApi";
import { NaverLogin } from "@react-native-seoul/naver-login";

axios.defaults.baseURL = SERVER ? SERVER : process.env.SERVER;

// POST /users : 유저 생성.
export const postUsers = async (body) => {
  try {
    console.log(body);
    console.log(axios.defaults.baseURL);
    const res = await axios.post(`/users`, body);

    if (res.status === 200) {
      const { accessToken, refreshToken } = res.data;
      axios.defaults.headers["authorization"] = accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      return res;
    }
    if (res.status === 500) {
      return 500;
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// GET /users/{email} : email에 해당하는 유저아이디 조회.
export const getUsers = async (email) => {
  try {
    const res = await axios.get(`/users/${email}`);
    if (res.status === 200) {
      const { accessToken, refreshToken } = res.data;
      axios.defaults.headers["authorization"] = accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      return res;
    } else {
      return 500;
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// resource에서 identifier에 해당하는 레코드 조회
export const getSomething = async (resource, identifier, params) => {
  try {
    const res = await axios.get(`/${resource}/${identifier}`, {
      params,
    });

    if (res.data.code === 403) {
      refreshToken = await SecureStore.getItemAsync("refreshToken");
      axios.defaults.headers["authorization"] = refreshToken;
      const res2 = await axios.get(`/${resource}/${identifier}`);

      if (res2.data.code === 403) {
        return "logOut";
      }
      const { accessToken } = res2.data;
      axios.defaults.headers["authorization"] = accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      return res2;
    }
    return res;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// resource에 요청
export const postSomething = async (resource, body) => {
  try {
    const res = await axios.post(`/${resource}`, body);

    if (res.data.code === 403) {
      refreshToken = await SecureStore.getItemAsync("refreshToken");
      axios.defaults.headers["authorization"] = refreshToken;
      const res2 = await axios.post(`/${resource}`, body);

      if (res2.data.code === 403) {
        return "logOut";
      }
      const { accessToken } = res2.data;
      axios.defaults.headers["authorization"] = accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      return res2;
    }
    return res;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// resource에서 identifier에 해당하는 레코드 삭제
export const deleteSomething = async (resource, identifier) => {
  try {
    const res = await axios.delete(`/${resource}/${identifier}`);

    if (res.data.code === 403) {
      refreshToken = await SecureStore.getItemAsync("refreshToken");
      axios.defaults.headers["authorization"] = refreshToken;
      const res2 = await axios.delete(`/${resource}/${identifier}`);

      if (res2.data.code === 403) {
        return "logOut";
      }
      const { accessToken } = res2.data;
      axios.defaults.headers["authorization"] = accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      return res2;
    }
    return res;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const logOut = async () => {
  let token = await SecureStore.getItemAsync("kakaoToken");
  if (token != null) {
    await kakaoApi.kakaoLogOut();
    await SecureStore.deleteItemAsync("kakaoToken");
  } else {
    NaverLogin.logout();
    await SecureStore.deleteItemAsync("naverToken");
  }
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};
