import React, { memo } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

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

const ShareTag = ({ item }) => {
  console.log(item.id);
  return (
    <Tag>
      <Content>{item.content}</Content>
      <LikeCnt>{item.likeCnt}</LikeCnt>
      <LikeBtn>
        {item.myLike ? (
          <AntDesign name="like1" size={24} color="black" />
        ) : (
          <AntDesign name="like2" size={24} color="black" />
        )}
      </LikeBtn>
    </Tag>
  );
};

export default React.memo(ShareTag);
