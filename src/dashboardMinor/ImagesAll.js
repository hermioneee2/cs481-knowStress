import React  from "react";
import { Tooltip } from 'antd';

const ImageAll = ({dash2Data}) => {

    return (
        <div>
            {dash2Data.map((imgName, index) => (
                <div key={index} style={ {marginBottom: '5px'}}>
                    <Tooltip title={imgName}>
                        <img src={require(`./images/${imgName}.png`)} width="27px" height="27px" alt={imgName} />
                    </Tooltip>
                </div>
            ))}
        </div>
    );
};

export default ImageAll;
