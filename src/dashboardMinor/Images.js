import React from "react";

const Images = ({dash2Data}) => {
    console.log(dash2Data);
    return (
        <div>
            {dash2Data.map((imgName, index) => (
                <div key={index} style={ {marginBottom: '5px'}}>
                    <img src={imgName} width="27px" height="27px" />
                </div>
            ))}
        </div>
    );
};

export default Images;
