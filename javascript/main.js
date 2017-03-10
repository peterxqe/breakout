var c = document.getElementById("area");
var canvas = c.getContext("2d");

var peddleX = 380;
var ballX = 400;
var ballY = 500;
var brickX = 0;
var brickY = 0;
var goDown = false;
var randomNumber = 0;
var divide = 1;
var bricksX = [];
var bricksY = [];
keyboardControl();
function startGame(){
    canvas.fillStyle = 'red';
    drawCircle(500);
    drawPeddle(peddleX);
    for (var i = 0; i < 64; i++) {
        bricksX.push(brickX);
        bricksY.push(brickY);
        drawBrick(bricksX[i],bricksY[i]);
        brickX = brickX + 50;
        if (brickX >= 800){
            brickX = 0;
            brickY = brickY + 30;
        }
    }
    setInterval(function ballTimer(){ballBorder(peddleX);}, 30);
}

function move(direction){
    if (direction == "left"){
        if(peddleX <= 680){
        peddleX = peddleX + 40;
        }
        canvas.clearRect(0, 549, 800, 100);
    }
    if (direction == "right"){
        if(peddleX >= 10){
        peddleX = peddleX - 40;
        }
        canvas.clearRect(0,549, 800,100);
    }
    drawPeddle(peddleX);
}

function drawCircle(ballX,ballY){
    canvas.beginPath();
    canvas.arc(ballX,ballY,5,0,2*Math.PI);
    canvas.fillStyle = "blue";
    canvas.fill();
    canvas.closePath();
}

function drawPeddle(peddleX){
    canvas.fillRect(peddleX, 550, 100, 10);
    canvas.stroke();
}

function drawBrick(brickX, brickY){
    canvas.fillRect(brickX, brickY, 49, 29);
    canvas.stroke();
}

function keyboardControl(){
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37 || event.keyCode == 65) {
            //left arrow or A, slide right.
            move("right");
        }
        else if(event.keyCode == 39 || event.keyCode == 68) {
            //right arrow or D, slide left.
            move("left");
        }
    });
}

function ballBorder(peddleX) {
    if (ballY >= 20 && goDown == false) {
        ballY = ballY - 10;
        canvas.clearRect(ballX-7,ballY,14,16);

    }
    if(ballY <= 605 && goDown==true){
        ballY = ballY + 10;
        canvas.clearRect(ballX-7,ballY-20,15,16);
    }
    if(ballY == 540 && ballX >= peddleX-10 && ballX <= peddleX+110){
         goDown = false;
         randomNumber = Math.floor((Math.random() * 5) + 1);
         divide = Math.floor((Math.random() * 2) + 1);
    }
    for (var i = 0; i < 64; i++) {
        if (ballY <= bricksY[i]+30 && ballX >= bricksX[i]-10 && ballX <= bricksX[i]+60){
            canvas.clearRect(bricksX[i],bricksY[i]+20 - 20,50,40);
            goDown = true;
            randomNumber = Math.floor((Math.random() * 5) + 1);
            divide = Math.floor((Math.random() * 2) + 1);
            bricksY[i]= 0;
            bricksX[i]= 0;
          }
          else if (ballY <= 10){
            goDown = true;
            randomNumber = Math.floor((Math.random() * 5) + 1);
            divide = Math.floor((Math.random() * 2) + 1);
        }
    }

    if (ballX <= 10){
        divide = 2;
    }
    if (ballX >= 790){
        divide = 1;
    }
    if(divide ==1){
        ballX = ballX - randomNumber;
    }
    if(divide ==2){
        ballX = ballX + randomNumber;
    }

    drawCircle(ballX,ballY);
}
