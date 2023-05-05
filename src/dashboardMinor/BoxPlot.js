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
  };
}

const BoxPlot = ({ lowerQuartile, median, upperQuartile, min, max }) => {
  useEffect(() => {
    const data = [
      generateBoxPlotData(lowerQuartile, median, upperQuartile, min, max),
    ];

    const layout = {
      yaxis: {
        showticklabels: false,
        zeroline: false,
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
  }, [lowerQuartile, median, upperQuartile, min, max]);

  return <div id="box-plot"></div>;
};

export default BoxPlot;
