import React from "react";


const StressCode = ({color, t, lev}) => {
    var circleStyle = {
        marginLeft: 1,
        padding:5,
        // margin:20,
        marginRight: 8,
        // marginBottom: 5,
        display:"inline-block",
        backgroundColor: color,
        borderRadius: "50%",
        width:5,
        height:5,
    };

    var levStyle = {
        marginLeft: 15,
        fontStyle: 'italic',
        fontWeight: 'lighter',
    };

    return (
        <div style={{marginBottom:5}} >
            <div style={circleStyle}></div>
            <text>{t}</text>
            <text style={levStyle}>{lev}</text>
        </div>
        
    );
};
  
export default StressCode;
