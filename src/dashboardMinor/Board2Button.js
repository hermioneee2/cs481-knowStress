import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import { alpha } from "@mui/material";


const Board2Button = ({activeButton, color, category, changeColor}) => {

    const [buttonColor, setButtonColor] = useState(alpha(color, 0.1));

    useEffect(() => {
        if (activeButton===category){
          setButtonColor(alpha(color, 0.7));
        } else {
            setButtonColor(alpha(color, 0.1));
        }
      }, [activeButton]);

    const buttonStyle = {
        textAlign: 'center',
        fontSize: '10px', 
        height:'5%', 
        boxShadow: 1, 
        marginBottom:1, 
        display:'flex', 
        flexDirection: 'column',
        color: color, 
        backgroundColor: buttonColor,
    };

    const handleClick = () => {
        changeColor(category);
        setButtonColor(alpha(color, 0.7));
    }
    
    

    return (
        <Button value={category} onClick={handleClick} sx={buttonStyle} variant="text">{category}</Button>
    );

};

export default Board2Button;
