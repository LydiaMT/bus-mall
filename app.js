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

// this function rendors the images to the page and makes sure none of the 3 are from the previous set of 3. 
// These variables the function is calling on were produced in the generateRandomProduct function
function renderProducts() {
  var currentRenderedImages = [leftProductImage.name, centerProductImage.name, rightProductImage.name];
  var newImages = generateRandomProducts()
  while(
    currentRenderedImages[0] === newImages[0].name ||
    currentRenderedImages[1] === newImages[0].name ||
    currentRenderedImages[2] === newImages[0].name ||
    currentRenderedImages[0] === newImages[1].name ||
    currentRenderedImages[1] === newImages[1].name ||
    currentRenderedImages[2] === newImages[1].name ||
    currentRenderedImages[0] === newImages[2].name ||
    currentRenderedImages[1] === newImages[2].name ||
    currentRenderedImages[2] === newImages[2].name
  ) {
    newImages = generateRandomProducts();
  }
  leftProductImage.src = newImages[0].image;
  leftProductImage.name = newImages[0].name;
  newImages[0].timesShown++;

  centerProductImage.src = newImages[1].image;
  centerProductImage.name = newImages[1].name;
  newImages[1].timesShown++;

  rightProductImage.src = newImages[2].image;
  rightProductImage.name = newImages[2].name;
  newImages[2].timesShown++;
} 

// voting rounds
var roundsStart = 0
var roundsFinal = 25
// random products to display each time
var newProducts = generateRandomProducts();
renderProducts(newProducts[0], newProducts[1], newProducts[2]);

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

// makes button appear after final click
function buttonCreation (){
  var newButton = document.createElement('button');
  newButton.textContent = "View Results"
  // removes event Listener - references productClick function
  productContainer.removeEventListener('click', productClick)
  newButton.addEventListener('click', function() {
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
          data: {
              labels: labelName, // change to product. array of strings goes here
              datasets: [{
                  label: 'Times Clicked', // modify to times clicked. Duplicat this for times shown. array of numbers goes here
                    data: votesByProduct,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderWidth: 1
                  },
                  {
                  label: 'Times Shown', // modify to times clicked. Duplicat this for times shown. array of numbers goes here
                    data: timesSeen,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderWidth: 1
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