const API_URL = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
const IMG_URL = "https://picsum.photos/1024/576.webp";
const COLORS = ["red", "purple", "black", "green", "blue", "orange"];

var data; // Stores API response
var current; // Indexing variable for data

// Change quote & author text in DOM based on data
function updateQuoteDOM(data) {
  let quot = document.querySelector("#quot"),
    quote = document.querySelector("#quote"),
    author = document.querySelector("#author");

  quot.children[0].style.fill = COLORS[current % COLORS.length]; // Change the color of open-quote symbol
  quote.innerHTML = data.en;
  author.innerHTML = `- ${data.author}`;
}

// Display loading spinner in DOM
function showLoading() {
  let card = document.querySelector(".card"),
    spinner = document.querySelector("#spinner");

  // Hide all children of card
  for (child of card.children) {
    child.style.display = "none";
  }
  spinner.style.display = "block"; // Show spinner only
}

// Hide loading spinner in DOM
function hideLoading() {
  let card = document.querySelector(".card"),
    spinner = document.querySelector("#spinner");

  // Display all children of card
  for (child of card.children) {
    child.style.display = "";
  }
  spinner.style.display = "none"; // Hide spinner
}

// Display error message in DOM
function showError() {
  let card = document.querySelector(".card"),
    error = document.querySelector("#error"),
    btnPrev = document.querySelector("#btn-prev"),
    btnNext = document.querySelector("#btn-next");

  // Generate element of error message
  error.innerHTML = `<img src="assets/cross.svg" alt="loading..." />
  <p>Error! Cannot get data from API</p>
  <p>Try to refresh the page</p>`;

  // Hide all children of card
  for (child of card.children) {
    child.style.display = "none";
  }
  error.style.display = "block"; // Display the error element
  btnPrev.style.display = "none"; // Hide previous button
  btnNext.style.display = "none"; // Hide next button
}

// Change background to random image based on API
function changeBackground() {
  showLoading();
  fetch(IMG_URL)
    .then((response) => {
      // If image retrieved from API, change the background
      document.body.style.backgroundImage = `url('${response.url}')`;
      hideLoading();
    })
    .catch((err) => {
      // If API retrieval failed, change the background by using image in assets instead
      document.body.style.backgroundImage = `url('/assets/background.jpg')`;
      hideLoading();
    });
}

// Get the next quote to be displayed
function nextQuote() {
  changeBackground();
  if (data) {
    current = current + 1 == data.length ? 0 : current + 1;
    updateQuoteDOM(data[current]);
  }
}

// Get the previous quote to be displayed
function prevQuote() {
  changeBackground();
  if (data) {
    current = current - 1 < 0 ? data.length : current - 1;
    updateQuoteDOM(data[current]);
  }
}

// Apply click listener to prev & next button
document.querySelector("#btn-next").addEventListener("click", nextQuote);
document.querySelector("#btn-prev").addEventListener("click", prevQuote);

// JavaScript running...
showLoading();
fetch(API_URL)
  .then((response) => response.json())
  .then((result) => {
    // Filter response value with maximum 150 characters and store it in a variable
    data = result.filter((x) => x.en.length <= 150);

    // Get a random index to show quote data
    current = Math.floor(Math.random() * data.length);

    updateQuoteDOM(data[current]);

    changeBackground();
  })
  .catch((err) => {
    showError();
    console.log(err);
  });
