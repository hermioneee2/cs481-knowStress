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
        verticalAlign: 'middle',
    };

    // var levStyle = {
    //     marginLeft: 15,
    //     fontStyle: 'italic',
    //     fontWeight: 'lighter',
    //     fontSize: '10px',
    // };

    return (
        <div style={{marginBottom:2}} >
            {v === -1 ? 
                <div  style={{marginTop: 10}}>
                <HighlightOffIcon sx={{verticalAlign: 'middle', color: '#CDCDCD', width: 10, height: 10}} /> 
                <LevelLabel style={{marginLeft: 10, verticalAlign: 'center'}}>{lev}</LevelLabel>
                </div>
                : 
                <div>
                <div style={circleStyle}></div> 
                <NumberLabel>{t}</NumberLabel>
                <LevelLabel>{lev}</LevelLabel>
                </div>
            }

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
    padding-bottom: 30px;
    vertical-align: middle;
`;

const LevelLabel = styled.span`
    color: ${(props) => props.theme.colors.blackKS};
    font-size: 10px;
    font-weight: lighter;
    font-style: italic;
    margin-left: 15px;
    padding-bottom: 30px;
    vertical-align: middle;
`;
  
export default StressCode;
