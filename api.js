import axios from "axios";

export const SERVER = "http://172.30.1.38:4000";

// GET /users/{email} : email에 해당하는 유저아이디 조회.
export const getUsers = async (email) => {
  try {
    const res = await axios.get(`${SERVER}/users/${email}`);
    if (res.status === 200) {
      return res;
    } else {
      return 500;
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// POST /users : 유저 생성.
export const postUesers = async (body) => {
  try {
    const res = await axios.post(`${SERVER}/users`, body);

    if (res.status === 200) {
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

// GET /emotions/{userId} : 감정 조회.
// GET /activities/{userId} : 활동 조회.
// GET /emooccurrences/{userId} : 감정 기록 조회.
// GET /actoccurrences/{userId} : 활동 기록 조회.

// POST /emotions : 감정 생성.
// POST /activities : 활동 생성.
// POST /emooccurrences : 감정 기록.
// POST /actoccurrences : 활동 기록.
// POST /EmoOccurrences/{userId}/ActOccurrences : 감정과 활동의 관계보기.
// DELETE /emotions/{id} : 감정 삭제.
// DELETE /activities/{id} : 활동 삭제.
// DELETE /emooccurrences/{id} : 감정 기록 삭제.
// DELETE /actoccurrences/{id} : 활동 기록 삭제.
