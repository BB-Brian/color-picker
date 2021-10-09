// //1. user can input hex color as #000000 or 000000
// //     -> take in # in input, remove # after received from input.
// //2. check the length - should be either 3 or 6 chars long.
// //#000 -> #000000
// //#123 -> #112233
// //3. Additional validation: add valid hex chars, 0-9 or a-f;
// //hex color


// //CHALLENGE 
// //Get a ref to hexInput and inputColor DOM elements
// //Create a keyup event handler for hexInput
// //Check if hex color is valid 
// //If hex color is valid, update the background color of inputColor.

const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");

const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");

const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else { 
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
});

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#","");

  inputColor.style.backgroundColor = "#" + strippedHex;
});

const isValidHex = (hex) => {
  if (!hex) return false;
  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
}

// //Test isValidHex function
// // console.log(isValidHex("#c9d8ac")) //true
// // console.log(isValidHex("#ffffff")) //true
// // console.log(isValidHex("#000000000")) //false
// // console.log(isValidHex("#fff")) //true
// // console.log(isValidHex("fff")) //true
// // console.log(isValidHex("ac")) //false

//CHALLENGE 2
//Create function to convert Hex to RGB
//hex: 000000 -> 00 00 00
//RGB:        -> r  g  b --> translate to dec val between 0 to 255
//this should work with 3 or 6 char hex vals.
//use useParseInt("", 16) to convert a hex val to a decimal val
//should return an obj with 3 props - r, g, and b
//Test func with 3 different use cases

const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;

  let strippedHex = hex.replace("#","");
  if (strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0]
    + strippedHex[1] + strippedHex[1]
    + strippedHex[2] + strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0,2), 16);
  const g = parseInt(strippedHex.substring(2,4), 16);
  const b = parseInt(strippedHex.substring(4,6), 16);

  return {r,g,b};
};

// test convertHexToRGB function
// console.log(convertHexToRGB("123"))
// console.log(convertHexToRGB("000"))
// console.log(convertHexToRGB("000000"))
// console.log(convertHexToRGB("ffe"))

//CHALLENGE 3
//Create function to convert RGB to Hex
//take in 3 parameters - r,g, and b
//for each (r,g,b) - create a hex pair that is two chars long
//return hex value starting with a hashtag

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
};

// console.log(convertRGBToHex(0,255,3));


//CHALLENGE 5
//create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

const alterColor = (hex, percentage) => {
  const {r,g,b} = convertHexToRGB(hex); 

  const amount = Math.floor((percentage/100) * 255);

  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);

  return convertRGBToHex(newR, newG, newB);
};

//CHALLENGE 6
//create function to keep output between 0 - 255
const increaseWithin0To255 = (hex, amount) => {
  const newHex = hex + amount;
  // if (newHex > 255) return 255;
  // if (newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
};

alterColor("fff", 10)

//CHALLENGE 4
//get a ref to the slider and sliderText DOM elements 
//create an input event listener for slider element
//display the value of the slider

slider.addEventListener("input", () => {
  if (!isValidHex(hexInput.value)) return;

  sliderText.textContent = `${slider.value}%`;
  
  const alteredHex = alterColor(hexInput.value, slider.value);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

//create custom toggle to allow user to switch between lightening or darkening the color
//
