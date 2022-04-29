import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { logOut, postSomething } from "../api";
import { userIdState } from "../state";
import { useRecoilValue } from "recoil";
import { Alert } from "react-native";

const Tag = styled.View`
  margin-bottom: 10px;
`;

const Content = styled.Text`
  font-size: 20px;
`;

const LikeCnt = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LikeBtn = styled.TouchableOpacity`
  width: 30px;
`;

const ShareTag = ({ item, setIsLogIn }) => {
  const userId = useRecoilValue(userIdState);
  const [like, setLike] = useState(item.myLike);
  const [likeCnt, setLikeCnt] = useState(item.likeCnt);

  const onPress = async () => {
    const res = await postSomething("Likes", {
      tagId: item.id,
      content: item.content,
      tagUserId: item.userId,
      userId,
      cnt: like ? -1 : 1,
    });

    if (res === "logOut") {
      logOut();
      setIsLogIn(false);
    } else {
      if (res.status === 200) {
        if (like) {
          setLike(null);
          setLikeCnt(likeCnt - 1);
        } else {
          setLike(item.id);
          setLikeCnt(likeCnt + 1);
        }
      } else {
        Alert.alert("잠시 후 다시 시도해주세요.");
      }
    }
  };

  console.log(item.id);
  return (
    <Tag>
      <Content>{item.content}</Content>
      <LikeCnt>{likeCnt}</LikeCnt>
      <LikeBtn onPress={onPress}>
        {like ? (
          <AntDesign name="like1" size={24} color="black" />
        ) : (
          <AntDesign name="like2" size={24} color="black" />
        )}
      </LikeBtn>
    </Tag>
  );
};

const ShareTagAreEqual = (prev, next) => {
  return prev.id === next.id &&
    prev.content === next.content &&
    prev.likeCnt === next.likeCnt &&
    prev.userId === next.userId &&
    (prev.myLike === next.myLike || (!prev.myLike && !next.myLike))
    ? true
    : false;
};

export default React.memo(ShareTag, ShareTagAreEqual);
