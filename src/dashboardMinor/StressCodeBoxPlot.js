import React from "react";
import styled from "styled-components";

const StressCodeBoxPlot = ({ v, color, t, lev }) => {
  var circleStyle = {
    marginLeft: 1,
    marginTop: 3,
    padding: 4,
    marginRight: 8,
    display: "inline-block",
    backgroundColor: color,
    borderRadius: "50%",
    width: 8,
    height: 8,
  };

  return (
    <div
      style={{
        marginBottom: 22.3,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <LevelLabel>{lev}</LevelLabel>
      <NumberLabel>{t}</NumberLabel>
      <div style={circleStyle}></div>
    </div>
  );
};

const NumberLabel = styled.span`
  color: ${(props) => props.theme.colors.blackKS};
  font-size: 10px;
  font-weight: 400;
  margin-right: 6px;
`;

const LevelLabel = styled.span`
  color: ${(props) => props.theme.colors.blackKS};
  font-size: 10px;
  font-weight: lighter;
  font-style: italic;
  margin-right: 6px;
`;

export default StressCodeBoxPlot;
