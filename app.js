'use strict';

// constructor function for making objects
function ProductImage (productName, image) {
  this.name = productName; //name of the object
  this.timesClicked = 0; //times product is clicked
  this.timesShown = 0; //times product is shown
  this.image = image; //this gets passed into the constructor
}

var allImages = []
if (localStorage.getItem('allImages')) { // if allImages array is already stored on the page, use that
  var allImagesString = localStorage.getItem('allImages');   //grabs the string, converts it to an array
  allImages = JSON.parse(allImagesString);
} else {
  allImages = [
  new ProductImage('bag', 'product_img/bag.jpg'),
  new ProductImage('banana', 'product_img/banana.jpg'),
  new ProductImage('bathroom', 'product_img/bathroom.jpg'),
  new ProductImage('boots', 'product_img/boots.jpg'),
  new ProductImage('breakfast', 'product_img/breakfast.jpg'),
  new ProductImage('bubblegum', 'product_img/bubblegum.jpg'),
  new ProductImage('chair', 'product_img/chair.jpg'),
  new ProductImage('cthulhu', 'product_img/cthulhu.jpg'),
  new ProductImage('dog duck', 'product_img/dog-duck.jpg'),
  new ProductImage('dragon', 'product_img/dragon.jpg'),
  new ProductImage('pen', 'product_img/pen.jpg'),
  new ProductImage('pet sweep', 'product_img/pet-sweep.jpg'),
  new ProductImage('scissors', 'product_img/scissors.jpg'),
  new ProductImage('shark', 'product_img/shark.jpg'),
  new ProductImage('sweep', 'product_img/sweep.png'),
  new ProductImage('tauntaun', 'product_img/tauntaun.jpg'),
  new ProductImage('unicorn', 'product_img/unicorn.jpg'),
  new ProductImage('usb', 'product_img/usb.gif'),
  new ProductImage('water can', 'product_img/water-can.jpg'),
  new ProductImage('wine glass', 'product_img/wine-glass.jpg'),
  ];
} 

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

// empty array of currently rendered images
var currentRenderedImages = [];
// this function rendors the images to the page and makes sure none of the 3 are from the previous set of 3. 
// These variables the function is calling on were produced in the generateRandomProduct function
function renderProducts() {
  var newImages = generateRandomProducts()
  // if we have images we can compare them, otherwise we don't
  if (currentRenderedImages.length > 0){
    while(
      currentRenderedImages[0].name === newImages[0].name ||
      currentRenderedImages[1].name === newImages[0].name ||
      currentRenderedImages[2].name === newImages[0].name ||
      currentRenderedImages[0].name === newImages[1].name ||
      currentRenderedImages[1].name === newImages[1].name ||
      currentRenderedImages[2].name === newImages[1].name ||
      currentRenderedImages[0].name === newImages[2].name ||
      currentRenderedImages[1].name === newImages[2].name ||
      currentRenderedImages[2].name === newImages[2].name
    ) {
      newImages = generateRandomProducts();
    }
  }
  // established 3 new images, emptying old array before the generateRandomProducts function
  currentRenderedImages = [];
  
  // pushes 'new current' render images into the array
  leftProductImage.src = newImages[0].image;
  leftProductImage.name = newImages[0].name;
  newImages[0].timesShown++;
  currentRenderedImages.push(newImages[0])

  centerProductImage.src = newImages[1].image;
  centerProductImage.name = newImages[1].name;
  newImages[1].timesShown++;
  currentRenderedImages.push(newImages[1])

  rightProductImage.src = newImages[2].image;
  rightProductImage.name = newImages[2].name;
  newImages[2].timesShown++;
  currentRenderedImages.push(newImages[2])
  }
renderProducts();
// voting rounds
var roundsStart = 0
var roundsFinal = 25
// random products to display each time
var newProducts = generateRandomProducts();

// function for clickEvents. Will be utilized to create button and to remove eventListener
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

// makes button appear after final click that brings up the chart when clicked
function buttonCreation (){
  var newButton = document.createElement('button');
  newButton.textContent = "View Results"
  // removes event Listener - references productClick function
  productContainer.removeEventListener('click', productClick)
  // takes array and turns it back into a string, then saves it to local storage    
  var allImagesString = JSON.stringify(allImages)
  localStorage.setItem('allImages', allImagesString)
  
  newButton.addEventListener('click', function() {
    // creaty empty arrays to fill with data for chart
    var votesByProduct = [];
    var timesSeen = [];
    var labelName = [];  

      // fills empty arrays with data for chart
      for (var l = 0; l < allImages.length; l++) {
        votesByProduct.push(allImages[l].timesClicked);
        timesSeen.push(allImages[l].timesShown);
        labelName.push(allImages[l].name);
      }

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
          data: {
              labels: labelName, // change to product. array of strings goes here
              datasets: [{
                  label: 'Times Clicked', // modify to times clicked. Duplicat this for times shown. array of numbers goes here
                    data: votesByProduct,
                    backgroundColor: new Array(20).fill('rgba(35, 203, 167, 1)'),
                    borderColor: new Array(20).fill('rgba(0, 0, 0, 1)'),
                    borderWidth: 3
                  },
                  {
                  label: 'Times Shown', // modify to times clicked. Duplicat this for times shown. array of numbers goes here
                    data: timesSeen,
                    backgroundColor: new Array(20).fill('rgba(44, 130, 201, 1)'),
                    borderColor: new Array(20).fill('rgba(0, 0, 0, 1)'),
                    borderWidth: 3
            }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      })
    });
  productContainer.appendChild(newButton);
}

// To initalize the page - references productClick function
productContainer.addEventListener('click', productClick);
