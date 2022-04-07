import React from "react";
import styled from "styled-components/native";

const BtnContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const AddBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const AddBtnText = styled.Text`
  font-size: 20px;
  color: gray;
`;

const Btn = ({ title, whatToDo }) => {
  return (
    <BtnContainer>
      <AddBtn onPress={whatToDo}>
        <AddBtnText>{title}</AddBtnText>
      </AddBtn>
    </BtnContainer>
  );
};

export default Btn;
