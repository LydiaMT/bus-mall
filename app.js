'use strict';

// constructor function for making objects
function ProductImage (productName, image) {
  this.name = productName; //name of the object
  this.timesClicked = 0; //times product is clicked
  this.timesShown = 0; //times product is shown
  this.image = image; //this gets passed into the constructor
}

// list of all product images
var allImages = [
new ProductImage('bag', 'img/bag.jpg'),
new ProductImage('banana', 'img/banana.jpg'),
new ProductImage('bathroom', 'img/bathroom.jpg'),
new ProductImage('boots', 'img/boots.jpg'),
new ProductImage('breakfast', 'img/breakfast.jpg'),
new ProductImage('bubblegum', 'img/bubblegum.jpg'),
new ProductImage('chair', 'img/chair.jpg'),
new ProductImage('cthulhu', 'img/cthulhu.jpg'),
new ProductImage('dog duck', 'img/dog-duck.jpg'),
new ProductImage('dragon', 'img/dragon.jpg'),
new ProductImage('pen', 'img/pen.jpg'),
new ProductImage('pet sweep', 'img/pet-sweep.jpg'),
new ProductImage('scissors', 'img/scissors.jpg'),
new ProductImage('shark', 'img/shark.jpg'),
new ProductImage('sweep', 'img/sweep.png'),
new ProductImage('tauntaun', 'img/tauntaun.jpg'),
new ProductImage('unicorn', 'img/unicorn.jpg'),
new ProductImage('usb', 'img/usb.gif'),
new ProductImage('water can', 'img/water-can.jpg'),
new ProductImage('wine glass', 'img/wine-glass.jpg'),
];

// select elements from my HTML to render product images
var productContainer = document.getElementById('product-container');
var leftProductImage = document.getElementById('left-product');
var centerProductImage = document.getElementById('center-product');
var rightProductImage = document.getElementById('right-product');

function generateRandomProducts() {
  // random index from the allImages array
  var leftIndex = Math.floor(Math.random() * allImages.length);
  var centerIndex = Math.floor(Math.random() * allImages.length);
  var rightIndex = Math.floor(Math.random() * allImages.length);
  //makes sure center images is different from left image
  while(leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex) {
    leftIndex = Math.floor(Math.random() * allImages.length);
    centerIndex = Math.floor(Math.random () * allImages.length);
    rightIndex = Math.floor(Math.random() * allImages.length);
  }
  var leftProduct = allImages[leftIndex];
  var centerProduct = allImages[centerIndex];
  var rightProduct = allImages[rightIndex];
  return [leftProduct, centerProduct, rightProduct];
}

// this function rendors the images to the page. These variables the function is calling on were produced in the generateRandomProduct function
function renderProducts(leftProduct, centerProduct, rightProduct) {
  leftProductImage.src = leftProduct.image;
  leftProduct.timesShown++;
  centerProductImage.src = centerProduct.image;
  centerProduct.timesShown++;
  rightProductImage.src = rightProduct.image;
  rightProduct.timesShown++;
} 

// voting rounds
var roundsStart = 0
var roundsFinal = 25
// random products to display each time
var newProducts = generateRandomProducts();
renderProducts(newProducts[0], newProducts[1], newProducts[2]);

// fucntion for clickEvents. Will be utilized to create button and to remove eventListener
function productClick (clickEvent) {
  for (var i = 0; i < allImages.length; i++) {
    // if you have the target source and the target source includes the current image in the loop, log it
    if (clickEvent.target.src && clickEvent.target.src.includes(allImages[i].image)) {
      allImages[i].timesClicked++;
      console.log(allImages[i])
    }
  }
  var newProducts = generateRandomProducts();
  renderProducts(newProducts[0], newProducts[1], newProducts[2]);
  roundsStart++
  // Now SHOW the button after final click
  if (roundsStart === roundsFinal) {
    buttonCreation()
  }
}

// makes button appear after final click
function buttonCreation (){
  var newButton = document.createElement('button');
  newButton.textContent = "View Results"
  // removes event Listener - references productClick function
  productContainer.removeEventListener('click', productClick)
  newButton.addEventListener('click', function() {
    for (var j = 0 ; j < allImages.length; j++) {
      var resultsList = document.createElement('p');
      productContainer.appendChild(resultsList);
      resultsList.textContent = (allImages[j].name + " had " + allImages[j].timesClicked + " votes, and was seen " + allImages[j].timesShown + " times")
    }
  });
  productContainer.appendChild(newButton);
}

// To initalize the page - references productClick function
productContainer.addEventListener('click', productClick);