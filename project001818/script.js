const canv = document.getElementById('canvas1');
const c = canv.getContext('2d');
const BoxSize = 20;
const rows = 20;
const columns = 20;
let snakeX = BoxSize*5;
let snakeY = BoxSize*5; 
let foodX;
let foodY;
let velocityX = 0;
let velocityY = 0;
let snakearray = 2;
let snakebody= [];
let gameover = false;
canv.width = BoxSize*rows;
canv.height = BoxSize*columns;

window.onload = ()=>{
    moverules();
    setInterval(move,1000/10)
    placefood();
};
function draw(){
    if(gameover){
        return;
    }
    c.fillStyle = 'black';
    c.fillRect(0,0,canv.width,canv.height);
    c.fillStyle = 'red';
    c.fillRect(foodX,foodY,BoxSize,BoxSize);
    if(snakeX==foodX&&snakeY==foodY){
        placefood();
        snakebody.push([foodX, foodY]);
    }
    for(let i = snakebody.length-1; i > 0; i--){
        snakebody[i] = snakebody[i-1];
    }
    if(snakebody.length){
        [snakeX, snakeY] = snakebody[0]; 
    }
    c.fillStyle = 'lime';
    c.fillRect(snakeX,snakeY,BoxSize,BoxSize);
    for(let x = 0; x<snakebody.length; x++){
        c.fillRect(snakebody[x][0],snakebody[x][1],BoxSize,BoxSize)
    }
    if(snakeX < 0 || snakeX > columns*BoxSize || snakeY < 0 || snakeY > rows*BoxSize){
        gameover = true;
        alert("game over");
        document.location.reload(true);
    }
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            gameover = true;
            alert("Game Over");
        }
    }
}

function moverules(){
    window.addEventListener('keydown',(e)=>{
      if(e.key=='ArrowUp'){
        velocityY = -1
        velocityX = 0
      }
      if(e.key=='ArrowLeft'){
        velocityY = 0
        velocityX = -1
      }
      if(e.key=='ArrowDown'){
        velocityY = 1
        velocityX = 0
      }
      if(e.key=='ArrowRight'){
        velocityY = 0
        velocityX = 1
      }  
      if(e.key=='w'){
        velocityY = 0
        velocityX = 0
      }    
});
}
function move(){
    draw();
    snakeX += velocityX*BoxSize;
    snakeY += velocityY*BoxSize;
}
function placefood(){
    foodX = Math.floor(Math.random()*BoxSize)*rows;
    foodY = Math.floor(Math.random()*BoxSize)*columns;
}