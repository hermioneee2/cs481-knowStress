import {theme} from '../styles/Theme'


function blendColors(color1, color2, proportion) {
  // Convert the colors to their RGB values
  let r1 = parseInt(color1.substring(1, 3), 16);
  let g1 = parseInt(color1.substring(3, 5), 16);
  let b1 = parseInt(color1.substring(5, 7), 16);
  let r2 = parseInt(color2.substring(1, 3), 16);
  let g2 = parseInt(color2.substring(3, 5), 16);
  let b2 = parseInt(color2.substring(5, 7), 16);

  // Calculate the blended color
  let r = Math.round((r1 * proportion) + (r2 * (1 - proportion)));
  let g = Math.round((g1 * proportion) + (g2 * (1 - proportion)));
  let b = Math.round((b1 * proportion) + (b2 * (1 - proportion)));

  // Convert the blended color back to hex format
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return hex;
}
// This code is generated by chatGTP

export const getColor = (v) => {
    let c1 = Math.floor(v)
    if (c1 === v) return theme.colors["stress"+c1]
    let c2 = Math.ceil(v)
    
    let color1 = theme.colors["stress"+c1]
    let color2 = theme.colors["stress"+c2]
    return blendColors(color1, color2, 1-(v-c1))

}

