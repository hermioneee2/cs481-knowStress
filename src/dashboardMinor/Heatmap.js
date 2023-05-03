import {theme} from '../styles/Theme'


function avg(a,b){
    const regex=/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ //regular expression to parse string
    a=regex.exec(a).slice(1)  //create array from string 'a' using regex
    b=regex.exec(b).slice(1)  //create array from string 'b' using regex
    let output=''
    for(let i=0;i<3;i++){
      const value=Math.floor(
         (
           parseInt(a[i],16) + //parse decimal from hexadecimal
           parseInt(b[i],16)   //parse decimal from hexadecimal
         )/2                   //perform averaging
       ).toString(16)          //convert back to hexadecimal
       output += (value.length<2?'0':'') + value //add leading zero if needed
    }
    return output
}
// This code is from :
// https://stackoverflow.com/questions/57065126/finding-average-of-colors-hexadecimal-strings

const getColor = ({v}) => {
    c1 = Math.floor(v)
    c2 = Math.ceil(v)
    
    color1 = theme.colors["stress"+c1]
    color2 = theme.colors["stress"+c2]
    avg(color1, color2)

}

