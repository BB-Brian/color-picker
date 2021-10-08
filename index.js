//1. user can input hex color as #000000 or 000000
//     -> take in # in input, remove # after received from input.
//2. check the length - should be either 3 or 6 chars long.
//#000 -> #000000
//#123 -> #112233
//3. Additional validation: add valid hex chars, 0-9 or a-f;
//hex color


//CHALLENGE 
//Get a ref to hexInput and inputColor DOM elements
//Create a keyup event handler for hexInput
//Check if hex color is valid 
//If hex color is valid, update the background color of inputColor.

const isValidHex = (hex) => {
  if (!hex) return false;
  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
}

//Test isValidHex function
// console.log(isValidHex("#c9d8ac")) //true
// console.log(isValidHex("#ffffff")) //true
// console.log(isValidHex("#000000000")) //false
// console.log(isValidHex("#fff")) //true
// console.log(isValidHex("fff")) //true
// console.log(isValidHex("ac")) //false