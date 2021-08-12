const BG_COLOR = '#666666';
const SNAKE_COLOR = '#c2c2c2';
const FOOD_COLOR = 'green';
var wynik=0;
const wynikValue=document.getElementById('wynik');
const canvas = document.getElementById('canvasBox');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height =800;
//klatki
const FR = 10;
// wielkosc
const S = 23;
//ilosc kratek
const T = canvas.width / S;
//wynik
let pos, speed, food, snake;


function init(){
//poczatkowa pozycja weza
  pos = {x: 10, y: 10};
  speed = {x: 0, y: 0};
  //tworzenie weza
  snake = [
    {x: 8, y: 10},
    {x: 9, y: 10},
    {x: 10, y: 10},
  ]

  randomFood();
}

init();

function randomFood(){
  food = {
    x: Math.floor(Math.random() * T),
    y: Math.floor(Math.random() * T),
  }

  for (let kratki of snake) {
    if(kratki.x === food.x && food.y === kratki.y) {
      return randomFood();
    }
  }
}

document.addEventListener('keydown', keydown);

function keydown(e){
  switch(e.keyCode) {
    case 37: {
      return speed = {x: -1, y: 0}
    }
    case 38: {
      return speed = {x: 0, y: -1}
    }
    case 39: {
      return speed = {x: 1, y: 0}
    }
    case 40: {
      return speed = {x: 0, y: 1}
    }
  }
}

setInterval(() => {

  requestAnimationFrame(gameLoop);
}, 90);

function gameLoop(){

  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
    //tworzenie weza
  ctx.fillStyle = SNAKE_COLOR;
  for (let kratki of snake) {
    ctx.fillRect(kratki.x*S, kratki.y*S, S,S);
  }

  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x*S,food.y*S,S,S);

  pos.x += speed.x;
  pos.y += speed.y;

  if (pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T) {
    init();
  }
//kolizja weza z punktem
  if (food.x === pos.x && food.y === pos.y) {
    wynik+=1;
    wynikValue.innerHTML=wynik;
    snake.push({...pos});
    pos.x += speed.x;
    pos.y += speed.y;
    randomFood();
  }

  if (speed.x || speed.y) {
      
    for (let kratki of snake) {
      if (kratki.x === pos.x && kratki.y === pos.y) {
        return init();
      }
    }
    snake.push({...pos});
    snake.shift();
  }
}
