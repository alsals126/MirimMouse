
//select canvas
const cvs=document.getElementById("pong");
const ctx = cvs.getContext("2d");

//캔버스 크기의 가로크기, 세로크기 변수에 저장
const CWIDTH = cvs.width;
const CHEIGHT= cvs.height;

//패들의 가로크기 세로크기 변수에 저장
const paddel_width=23;
const paddle_height=120;

//create the user paddle 
const user={
    x:0,
    y:CHEIGHT/2-paddle_height/2,
    width:paddel_width,
    height:paddle_height,
    color:"RED",
    score:0
}

const com = {
    x:CWIDTH-paddel_width,
    y:CHEIGHT/2-paddle_height/2,
    width:paddel_width,
    height:paddle_height,
    color:"WHITE",
    score:0
}

const ball = {
    x:CWIDTH/2,
    y:CHEIGHT/2,
    radius:20,
    speed:10,
    velocityX:5,
    velocityY:5,
    color:"YELLOW"
}

const net={
    x:CWIDTH/2-1,
    y:0,
    width:2,
    height:10,
    color:"WHITE"
}

//draw the net
function drawNet(){
    for(let i=0;i<=CHEIGHT;i+=15){
        drawRect(net.x,net.y+i,net.width,net.height,net.color);
    }
}
//draw rect function
function drawRect(x,y,w,h,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function drawCircle(x,y,radius,color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,radius,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

//draw Text
function drawText(text,x,y,color){
    ctx.fillStyle=color;
    ctx.font="70px fantasy";
    ctx.fillText(text,x,y);
}

//render the game
function render(){
    //clear the canvas
    drawRect(0,0,cvs.width,cvs.height,"BLACK");

    //draw the net
    drawNet();

    //draw score
    drawText(user.score,CWIDTH/4,CHEIGHT/5,"WHITE");
    drawText(com.score,3*CWIDTH/4,CHEIGHT/5,"WHITE");

    //draw the user and com paddle
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);

    //draw the ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}

//control the user paddle
cvs.addEventListener("mousemove",movePaddle);

function movePaddle(evt){
    let rect = cvs.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}

function collision(b,p){
    b.top=b.y-b.radius;
    b.bottom = b.y+b.radius;
    b.left = b.x-b.radius;
    b.right=b.x+b.radius;

    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left = p.x;
    p.right=p.x+p.width;

    return b.right>p.left && b.bottom > p.top && b.left<p.right && b.top<p.bottom;
}

function resetBall(){
    ball.x=CWIDTH/2;
    ball.y=CHEIGHT/2;
    
    ball.speed=10;
    ball.velocityX = -ball.velocityX;
}

//일시정지 => 스페이스바 누르면
// function pause(){
//     gameStatus="P";
//     window.addEventListener('keydow',)
// }

//update :pos,mov,score,...
function update(){
    ball.x += ball.velocityX;
    ball.y+=ball.velocityY;
    
    let computerLevel = 0.1;
    com.y += (ball.y-(com.y+com.height/2))*computerLevel;

    if(ball.y + ball.radius>CHEIGHT || ball.y-ball.radius <0){
        ball.velocityY=-ball.velocityY;
    }


    let player= (ball.x<CWIDTH/2)?user:com;
    if(collision(ball,player)){
        let collidePoint = ball.y-(player.y+player.height/2);

        collidePoint=collidePoint/(player.height/2);
        let angleRad = collidePoint*Math.PI/4;
        //
        let direction = (ball.x<CWIDTH/2)?1:-1;


        //change vel X and Y
        ball.velocityX = direction * ball.speed*Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        //everytime the ball hit a paddle, speed+
        ball.speed+=0.5;
    }

    //update score
    if(ball.x-ball.radius<0){
        //the com win
        com.score++;
        resetBall();
    }else if(ball.x+ball.radius>CWIDTH){
        user.score++;
        resetBall();
    }
}

//game init
function game(){
    update();
    render();
}

//loop
const framePerSecond=50;
var pingpongInterval = setInterval(game,1000/framePerSecond);

const open = () => {
    document.querySelector(".modal").classList.remove("hidden");
  }

  const close = () => {
    document.querySelector(".modal").classList.add("hidden");
  }

  document.querySelector(".openBtn").addEventListener("click", open);
  document.querySelector(".closeBtn").addEventListener("click", close);
  document.querySelector(".bg").addEventListener("click", close);
