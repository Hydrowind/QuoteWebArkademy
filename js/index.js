const API_URL = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
const COLORS = ["red", "black", "brown", "green", "blue", "orange"];

var data;
var current;

var quot = document.querySelector("#quot");
var quote = document.querySelector("#quote");
var author = document.querySelector("#author");

changeBackground();
fetch(API_URL)
  .then((response) => response.json())
  .then((result) => {
    data = result.filter((x) => x.en.length <= 150);
    current = Math.floor(Math.random() * data.length);

    quote.innerHTML = data[current].en;
    author.innerHTML = data[current].author;
  })
  .catch((err) => {
    showError();
    console.log(err);
  });

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
    child.style.display = "";
  }
  let spinner = document.querySelector("#spinner");
  spinner.style.display = "none";
}

function showError() {
  let card = document.querySelector(".card");
  for (child of card.children) {
    child.style.display = "none";
  }
  let error = document.querySelector("#error");
  error.style.display = "block";
  document.querySelector("#btn-prev").style.display = "none";
  document.querySelector("#btn-next").style.display = "none";
}

function hideError() {
  let card = document.querySelector(".card");
  for (child of card.children) {
    child.style.display = "";
  }
  let error = document.querySelector("#error");
  error.style.display = "none";
}

function changeBackground() {
  showLoading();
  fetch("https://picsum.photos/1024/576.webp")
    .then((response) => {
      document.body.style.backgroundImage = `url('${response.url}')`;
      hideLoading();
    })
    .catch((err) => {
      document.body.style.backgroundImage = `url('/assets/background.jpg')`;
      hideLoading();
    });
}

function nextQuote() {
  changeBackground();
  if (data) {
    quot.children[0].style.fill = COLORS[current % COLORS.length];
    current++;
    current %= data.length;
    quote.innerHTML = data[current].en;
    author.innerHTML = "- " + data[current].author;
  }
}

function prevQuote() {
  changeBackground();
  if (data) {
    quot.children[0].style.fill = COLORS[current % COLORS.length];
    current--;
    if (current < 0) current = data.length;
    quote.innerHTML = data[current].en;
    author.innerHTML = data[current].author;
  }
}

document.querySelector("#btn-next").addEventListener("click", nextQuote);
document.querySelector("#btn-prev").addEventListener("click", prevQuote);
