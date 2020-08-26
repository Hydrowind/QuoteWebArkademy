const API_URL = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";

var data;
var current;

var quote = document.querySelector("#quote");
var author = document.querySelector("#author");

fetch(API_URL)
  .then((response) => response.json())
  .then((result) => {
    data = result;
    current = Math.floor(Math.random() * data.length);

    quote.innerHTML = data[current].en;
    author.innerHTML = data[current].author;
  });

changeBackground();

function showLoading() {
  let card = document.querySelector(".card");
  for (child of card.children) {
    child.style.display = "none";
  }
  let spinner = document.querySelector("#spinner");
  spinner.style.display = "block";
}

function hideLoading() {
  let card = document.querySelector(".card");
  for (child of card.children) {
    child.style.display = "block";
  }
  let spinner = document.querySelector("#spinner");
  spinner.style.display = "none";
}

function changeBackground() {
  showLoading();
  fetch("https://picsum.photos/1024/576.webp").then((response) => {
    document.body.style.backgroundImage = `url('${response.url}')`;
    hideLoading();
  });
}

function nextQuote() {
  changeBackground();
  current++;
  current %= data.length;
  quote.innerHTML = data[current].en;
  author.innerHTML = data[current].author;
}

function prevQuote() {
  changeBackground();
  current--;
  if (current < 0) current = data.length;
  quote.innerHTML = data[current].en;
  author.innerHTML = data[current].author;
}

document.querySelector("#btn-next").addEventListener("click", nextQuote);
document.querySelector("#btn-prev").addEventListener("click", prevQuote);
