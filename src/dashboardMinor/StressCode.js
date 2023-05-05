import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const StressCode = ({v, color, t, lev}) => {
    var circleStyle = {
        marginLeft: 1,
        // marginTop: 4,
        padding:4,
        marginRight: 8,
        display:"inline-block",
        backgroundColor: color,
        borderRadius: "50%",
        width:4,
        height:4,
    };

    // var levStyle = {
    //     marginLeft: 15,
    //     fontStyle: 'italic',
    //     fontWeight: 'lighter',
    //     fontSize: '10px',
    // };

    return (
        <div style={{marginBottom:2}} >
            {v === -1 ? <HighlightOffIcon sx={{color: '#CDCDCD', width: 10, height: 10, marginTop: 2}} /> : <div style={circleStyle}></div> }
            <NumberLabel>{t}</NumberLabel>
            <LevelLabel>{lev}</LevelLabel>

            {/* <div style={circleStyle}></div> */}
            {/* <text>{t}</text> */}
            {/* <text style={levStyle}>{lev}</text> */}
        </div>
        
    );

};

const NumberLabel = styled.span`
    color: ${(props) => props.theme.colors.blackKS};
    font-size: 10px;
    font-weight: 400;
`;

const LevelLabel = styled.span`
    color: ${(props) => props.theme.colors.blackKS};
    font-size: 10px;
    font-weight: lighter;
    font-style: italic;
    margin-left: 15px;
    padding-bottom: 15px;
`;
  
export default StressCode;
