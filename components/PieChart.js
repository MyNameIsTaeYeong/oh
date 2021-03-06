import React from "react";
import { VictoryPie } from "victory-native";
import styled from "styled-components/native";

const Title = styled.Text`
  font-size: 15px;
`;

const Container = styled.View`
  align-items: center;
`;

const PieChart = ({ data, title, subTitle }) => {
  return (
    <Container>
      <VictoryPie
        animate={{ easing: "exp" }}
        data={data}
        padding={70}
        innerRadius={20}
        style={{
          data: {
            fillOpacity: 0.9,
            stroke: "#fff",
            strokeWidth: 2,
          },
          labels: {
            fill: "#212121",
          },
        }}
      />
      <Title>
        {title}(와)과 같은날 발생했던 {subTitle}
      </Title>
    </Container>
  );
};

export default PieChart;
