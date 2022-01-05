import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login as KakaoLogin,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import MMKVStorage from "react-native-mmkv-storage";

const MMKV = new MMKVStorage.Loader().initialize();

const kakaoApi = {
  signInWithKakao: async (): Promise<void> => {
    const token: KakaoOAuthToken = await KakaoLogin();
    await MMKV.setMapAsync("kakaoToken", token);
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
    await MMKV.removeItem("kakaoToken");
    console.log(response);
  },
  unlinkKakao: async (): Promise<void> => {
    const message = await unlink();
    console.log(message);
  },
};

export default kakaoApi;
