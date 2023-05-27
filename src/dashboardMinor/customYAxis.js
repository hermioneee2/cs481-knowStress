import React from "react";
import { theme } from "../styles/Theme";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryTooltip,
} from "victory";

const CustomYAxis = () => {
  const CircleTick = (props) => {
    let stressColor;
    if (props.index === 0) {
      stressColor = theme.colors.stress0;
    } else if (props.index === 1) {
      stressColor = theme.colors.stress1;
    } else if (props.index === 2) {
      stressColor = theme.colors.stress2;
    } else if (props.index === 3) {
      stressColor = theme.colors.stress3;
    } else if (props.index === 4) {
      stressColor = theme.colors.stress4;
    } else if (props.index === 5) {
      stressColor = theme.colors.stress5;
    } else if (props.index === 6) {
      stressColor = theme.colors.stress6;
    } else {
      stressColor = theme.colors.stress0;
    }
    return <circle cx={props.x1} cy={props.y1} r={"5px"} fill={stressColor} />;
  };

  return (
    <VictoryChart
      responsive={false}
      width={500}
      theme={VictoryTheme.material}
      domainPadding={{ x: [30, 30], y: [5, 5] }}
      padding={{ left: 120, top: 0, right: 20, bottom: 0 }}
    >
      {/* y축 */}
      <defs>
        <linearGradient
          id="YGradient"
          y1="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={theme.colors.stress6} />
          <stop offset="50%" stopColor={theme.colors.stress2} />
          <stop offset="100%" stopColor={theme.colors.stress0} />
        </linearGradient>
      </defs>
      <VictoryAxis
        dependentAxis
        domain={[0, 6]}
        domainPadding={0}
        tickValues={[0, 1, 2, 3, 4, 5, 6]}
        tickComponent={<CircleTick />}
        tickFormat={(tick) => tick}
        tickLabelComponent={
          <VictoryLabel
            style={{
              fontFamily: "Open Sans",
              fontStyle: "normal",
              fontWeight: 300,
              fill: theme.colors.blackKS,
              size: "10px",
            }}
          />
        }
        style={{
          grid: { stroke: "transparent" },
          tickLabels: { fontSize: 10 },
          axis: { dx: 10, stroke: "url(#YGradient)" },
        }}
      />
      <VictoryLabel
        x={5}
        y={-0}
        text="Very Stressed"
        style={{
          fontFamily: "Open Sans",
          fontStyle: "italic",
          fontWeight: 300,
          fill: theme.colors.blackKS,
          size: "10px",
        }}
      />
      <VictoryLabel
        x={10}
        y={350}
        text="Not Stressed"
        style={{
          fontFamily: "Open Sans",
          fontStyle: "italic",
          fontWeight: 300,
          fill: theme.colors.blackKS,
          size: "10px",
        }}
      />
      <div style={{ marginBottom: "10px" }}></div>
    </VictoryChart>
  );
};

export default CustomYAxis;
