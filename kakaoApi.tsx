import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login as KakaoLogin,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import * as SecureStore from "expo-secure-store";

const kakaoApi = {
  signInWithKakao: async (): Promise<void> => {
    const token: KakaoOAuthToken = await KakaoLogin();
    await SecureStore.setItemAsync("kakaoToken", token.accessToken);
  },
  signOutWithKakao: async (): Promise<void> => {
    const message = await logout();
  },
  getProfile: async (): Promise<String> => {
    const profile: KakaoProfile = await getKakaoProfile();
    return profile.email;
  },
  kakaoLogOut: async () => {
    const response = await logout();
    console.log(response);
  },
  unlinkKakao: async (): Promise<void> => {
    const message = await unlink();
    console.log(message);
  },
};

export default kakaoApi;
