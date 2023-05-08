import React from "react";
import Button from '@mui/material/Button';
import { alpha } from "@mui/material";
import styled from "styled-components";


const Board2Button = ({color, category, changeColor}) => {

    const buttonStyle = {
        textAlign: 'center',
        fontSize: '10px', 
        height:'22px', 
        boxShadow: 1, 
        marginBottom:1, 
        display:'flex', 
        flexDirection: 'column',
        color: color, 
        backgroundColor: alpha(color, 0.1) 
    };
    

    return (
        <Button value={category} onClick={()=>changeColor(category)} sx={buttonStyle} variant="text">{category}</Button>
    );

};

export default Board2Button;
