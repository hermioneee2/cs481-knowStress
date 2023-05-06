import React, { useEffect } from "react";
import Plotly from "plotly.js";
import { theme } from "../styles/Theme";

function generateBoxPlotData(lowerQuartile, median, upperQuartile, min, max) {
  return {
    y: [min, lowerQuartile, median, upperQuartile, max],
    type: "box",
    boxpoints: false,
    hovertemplate: "%{y}",
    marker: {
      color: theme.colors.grayKS,
    },
    line: {
      width: 1.2,
    },
    fillcolor: "rgba(0,0,0,0)",
    name: "",
    width: 1,
  };
}

// function showMyValueInfo(myValue) {
//   return {
//     x: [1],
//     y: [myValue],
//     text: [myValue],
//     mode: "text",
//   };
// }

const BoxPlot = ({
  lowerQuartile,
  median,
  upperQuartile,
  min,
  max,
  myValue,
}) => {
  useEffect(() => {
    const data = [
      generateBoxPlotData(lowerQuartile, median, upperQuartile, min, max),
      // showMyValueInfo(myValue),
    ];

    const layout = {
      shapes: [
        {
          type: "line",
          x0: -1,
          y0: myValue,
          x1: 1,
          y1: myValue,
          line: {
            color: theme.colors.me,
            width: 2,
            dash: "dash",
          },
        },
      ],
      yaxis: {
        showticklabels: false,
        zeroline: false,
        range: [0, 6],
        showgrid: true,
        tickmode: "array",
        tickvals: [0, 1, 2, 3, 4, 5, 6],
        fixedrange: true,
      },
      margin: {
        t: 0,
        b: 0,
      },
      height: 210,
    };

    const config = {
      displayModeBar: false,
    };

    Plotly.newPlot("box-plot", data, layout, config);
  }, [lowerQuartile, median, upperQuartile, min, max, myValue]);

  return <div id="box-plot"></div>;
};

export default BoxPlot;
