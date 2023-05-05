import React from "react";
import Plot from 'react-plotly.js';
import {theme} from '../styles/Theme'



const BarChart = ({color, dash2Data}) => {

    const data = [{
          x: dash2Data.map((arr) => arr[2]),
          y: dash2Data.map((arr) => arr[0]),  //d.y 이런식으로해서 아예 '그림'을 가져오기?
          type: "bar",
          orientation: "h",
          marker: {color: color, width: 0.5,}, //d.color - 얘도 category 별 색상을 가져와야 할 듯
          //+버튼 클릭 이벤트 있을 시 category 별 색상 변경해서 가져오기
          //getCategoryColor
          // displayModeBar: 'false',
          hoverinfo: 'skip',
        },];

    const layout = {
        width: 600,
        height: 300,
        xaxis: {
            title: {text: "Average Stress Level", standoff:20, font: {size: 10, color: theme.colors.grayKS}}, 
            range: [0, 6], 
            tickfont: { size: 11, color:theme.colors.grayKS  },
        },
        margin: {t: 0, },
        pad: {t:0,},
        yaxis: {automargin: false},
        // title: 'Average Stress Level By Application',
    };

    return (
        <Plot data = {data} config={{displayModeBar:false}} layout={layout} />
      );

};

export default BarChart;
