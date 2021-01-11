const boxEles = document.getElementById("container").children;
const messageEle = document.getElementById("resultDisplay");
const resetBtnEle = document.getElementById("resetButton");
const popupEle = document.getElementById("popup");

for (let i = 0; i < 81; i++) {
  boxEles[i].setAttribute("id", i);
}

var isBom = new Array(81);
window.random = new Array();
var isGameOver = false;
var counter = 0;

const setBom = () => {
  let x = 0;
  let y = Math.floor(Math.random() * 10) % 9;
  //   console.log(y, "this is y");
  for (let i = 0; i < 9; i++) {
    if (i === y) {
      idx = (Math.floor(Math.random() * 10) % 4) + x;
      isBom[idx] = 1;
      random.push(idx + 1);
      console.log(idx);
      idx = (Math.floor(Math.random() * 10) % 5) + x + 4;
      isBom[idx] = 1;
      random.push(idx + 1);
      console.log(idx);
    } else {
      idx = (Math.floor(Math.random() * 10) % 9) + x;
      isBom[idx] = 1;
      random.push(idx + 1);
      console.log(idx);
    }
    x += 9;
  }
};

const resetGame = () => {
  popupEle.style.display = "none";
  initializeGame();
};

const gameOver = (text) => {
  if (text == "GAME OVER!") messageEle.style.height = "40px";
  popupEle.style.display = "grid";
  messageEle.innerHTML = text;
  isGameOver = true;
};

const showAllBomb = () => {
  for (let i = 0; i < 10; i++) {
    boxEles[random[i] - 1].classList.add("bomb");
  }
  gameOver("GAME OVER!");
};

const handleClick = (e) => {
  if (isGameOver) return;
  if (!isBom[parseInt(e.target.id)]) {
    e.target.classList.add("correct");
    counter++;
    if (counter == 71) gameOver("WON");
  } else showAllBomb();
};

for (let i = 0; i < 81; i++) {
  boxEles[i].addEventListener("click", (e) => handleClick(e), true);
}

const initializeGame = () => {
  random = new Array();
  setBom();
  isGameOver = false;
  //   console.log(window.random);
  counter = 0;
  for (let i = 0; i < 81; i++) {
    boxEles[i].classList.remove("bomb");
    boxEles[i].classList.remove("correct");
  }
};

resetBtnEle.addEventListener("click", () => resetGame());

initializeGame();
