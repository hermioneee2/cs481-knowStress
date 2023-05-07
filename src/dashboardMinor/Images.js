import React from "react";
import Plot from 'react-plotly.js';
import {theme} from '../styles/Theme'



const Images = ({dash2Data}) => {

    // const arr =  dash2Data.map((arr) => 
    //     <img src={`../styles/images/${arr[0]}.png`} width="10px" height="10px" />
    // )
    // console.log(arr)


    return (
        <div>
            {dash2Data.map((arr, index) => (
                <div key={index} style={{display: 'block'}}>
                    <img src={`../styles/images/${arr[0]}.png`} width="10px" height="10px"/>
                </div>
            ))}
        </div>
        
    );
};

export default Images;
