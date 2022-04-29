import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import DialogInput from "react-native-dialog-input";
import Btn from "../components/Btn";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { userIdState } from "../state";
import { getSomething, logOut, postSomething } from "../api";
import ShareTag from "../components/ShareTag";

const Container = styled.View`
  height: ${(props) => props.theme.height};
  background-color: ${(props) => props.theme.bgColor};
  opacity: ${(props) => props.theme.opacity};
  padding: 15px;
`;

const VSepa = styled.View`
  height: 20px;
`;

const Share = ({ setIsLogIn }) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [shareTags, setShareTags] = useState([]);
  const userId = useRecoilValue(userIdState);
  const [isLoading, setIsLoading] = useState(true);

  const getShareTags = async () => {
    setIsLoading(true);
    const res = await getSomething("sharetags", userId, { page });
    if (res === "logOut") {
      logOut();
      setIsLogIn(false);
    } else {
      if (res.status === 200) {
        setShareTags([...shareTags, ...res.data.results]);
        setIsLoading(false);
      } else {
        Alert.alert("잠시 후 다시 시도해주세요.");
      }
    }
  };

  const postShareTags = async (content) => {
    setIsLoading(true);
    const res = await postSomething("sharetags", { content, userId });
    if (res === "logOut") {
      logOut();
      setIsLogIn(false);
    } else {
      if (res.status === 200) {
        setVisible(false);
        setIsLoading(false);
        setShareTags([
          {
            id: res.data.insertId,
            content,
            userId,
            likeCnt: 0,
          },
          ...shareTags,
        ]);

        Alert.alert("등록 되었습니다!");
      } else {
        Alert.alert("잠시 후 다시 시도해주세요.");
      }
    }
  };

  const renderItem = ({ item }) => (
    <ShareTag item={item} setIsLogIn={setIsLogIn} />
  );

  const renderLoader = () => {
    return isLoading ? <ActivityIndicator size="large" color="black" /> : null;
  };

  const getNextPage = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getShareTags();
  }, [page]);

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shareTags}
        keyExtractor={(item) => item.id}
        onEndReached={getNextPage}
        onEndReachedThreshold={0}
        renderItem={renderItem}
        windowSize={2}
        ItemSeparatorComponent={() => <VSepa />}
        ListFooterComponent={renderLoader}
      />
      <Btn title={"공유하기"} whatToDo={() => setVisible(true)} />
      <DialogInput
        isDialogVisible={visible}
        title={"공유"}
        message={`공유할 내용을 입력하세요.`}
        hintInput={"입력"}
        submitInput={(content) => {
          postShareTags(content);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      />
    </Container>
  );
};

export default Share;
