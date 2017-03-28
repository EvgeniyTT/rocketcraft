window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var stats;
var ctxStats;

var bull;
var ctxBullets;

var enemyCvs;
var ctxEnemy;

var drawBtn;
var clearBtn;
var startBtn;
var stopBtn;

var gameWidth = 1152;
var gameHeight = 500; //648

var background = new Image();
background.src = "./src/img/bg10.png";
var background1 = new Image();
background1.src = "./src/img/bg10.png";

var tiles = new Image();
tiles.src = "./src//img/tiles.png";

var player;
var enemies = [];
var boss;
var bossCounter;
var levelText;
var bullets = [];
var enemyBullets = [];

var isPlaying;

var mapX = 0;
var map1X = gameWidth;


var requestAnimFrame = window.requestAnimationFrame ||
                        window.webkitCancelRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame;


function init(){
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    enemyCvs = document.getElementById("enemy");
    ctxEnemy = enemyCvs.getContext("2d");

    stats = document.getElementById("stats");
    ctxStats = stats.getContext("2d");

    bull = document.getElementById("bullet");
    ctxBullets = bull.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;
    pl.width = gameWidth;
    pl.height = gameHeight;
    enemyCvs.width = gameWidth;
    enemyCvs.height = gameHeight;
    stats.width = gameWidth;
    stats.height = gameHeight;
    bull.width = gameWidth;
    bull.height = gameHeight;

    ctxStats.fillStyle = "#3D3D3D";
    ctxStats.font = "bold 15pt Arial";

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");
    startBtn = document.getElementById("startLoop");
    stopBtn = document.getElementById("stopLoop");

//    drawBtn.addEventListener("click",drawRect, false);
//    clearBtn.addEventListener("click",clearRect, false);

    player = new Player();
    boss = new Boss();
    bossCounter = 1;

    startLoop();
    setTimeout(function(){beginLevel()},2000);

    document.addEventListener("keydown",checkKeyDown);
    document.addEventListener("keyup",checkKeyUp);

}


function loop(){
    if(isPlaying){
        draw();
        update();
        requestAnimFrame(loop);
    }
}

function startLoop(){
    isPlaying = true;
    loop();
    startCreatingEnemies();
}

function stopLoop(){
    isPlaying = false;
}


function draw(){
    player.draw();
    clearCtxEnemy();
    for(var i=0; i<enemies.length; i++) {
        enemies[i].draw();
    }
    clearCtxBullets();
    for(var i=0; i<bullets.length; i++) {
        bullets[i].draw();
    }
    for(var i=0; i<enemyBullets.length; i++) {
        enemyBullets[i].draw();
    }
}

function update(){
    moveBg();
    drawBg();
    updateStats(player);
    player.update();
    for(var i=0; i<enemies.length; i++) {
        enemies[i].update();
    }
    for(var i=0; i<bullets.length; i++) {
        bullets[i].update();
    }
    for(var i=0; i<enemyBullets.length; i++) {
        enemyBullets[i].update();
    }
}

function makeRandomVector() {
    var x = Math.random()+2;
    var y = Math.random() * 2 - 1;
    var vectorLength = Math.sqrt((x * x) + (y * y));
    var normalizedVector = [x / vectorLength, y / vectorLength];
    return normalizedVector;
}

function makeVector(x1,y1,x2,y2) {
    var x = x1-x2;
    var y = y1-y2;
    var angleY=0;
    var vectorLength = Math.sqrt((x * x) + (y * y));
    var angleX = getAngleToAxis(x,y,x);
    //var angleY = getAngleToAxis(x,y,y);

    var normalizedVector = [x / vectorLength, y / vectorLength, angleX, angleY];
    return normalizedVector;
}


function getAngleToAxis(x,y,axis){
    var angle;
    var vectorLength = Math.sqrt((x * x) + (y * y));
    var vec = axis/vectorLength;
    angle = Math.abs( (Math.atan( ((Math.sqrt(1-vec*vec))/vec)  ) * (180/3.1459) ) );
    return angle
}



function updateStats(player) {
    ctxStats.clearRect(0,0,gameWidth,gameHeight);
    ctxStats.fillText("Health: " + player.health,20,20);
    ctxStats.fil
    ctxStats.fillText("Score: " + player.score,150,20);
    if (boss.isAlive){
        ctxStats.fillText("Boss Health: " + boss.health,1000,20);
    }
    if (levelText){
        ctxStats.fillText(levelText,500,300);
    }

}

function moveBg(){
    var vel = 5;
    mapX-= vel;
    map1X-= vel;
    if(mapX+gameWidth<0){mapX=gameWidth-5}
    if(map1X+gameWidth<0){map1X=gameWidth-5}
}


function clearCtxPlayer(){
    ctxPl.clearRect(0,0,gameWidth,gameHeight);
}


function clearCtxEnemy(){
    ctxEnemy.clearRect(0,0,gameWidth,gameHeight);
}

function clearCtxBullets(){
    ctxBullets.clearRect(0,0,gameWidth,gameHeight);
}

function drawBg(){
    ctxMap.clearRect(0, 0, gameWidth, gameHeight);
    ctxMap.drawImage(background, 0, 0, 1152, 648,
        mapX, 0, gameWidth, gameHeight);
    ctxMap.drawImage(background1, 0, 0, 1152, 648,
        map1X, 0, gameWidth, gameHeight);
}


function between(x, min, max) {
    return x >= min && x <= max;
}

function clash(obj1, obj2){
        if(
            obj1.drawX+obj1.width >= obj2.drawX &&
            ((between(obj1.drawY, obj2.drawY, obj2.drawY+obj2.height) ||
            between(obj1.drawY+obj1.height, obj2.drawY,obj2.drawY+obj2.height)) ||
            (between(obj2.drawY, obj1.drawY, obj1.drawY +obj1.height) ||
            between(obj2.drawY+obj2.height, obj1.drawY, obj1.drawY +obj1.height))
            )
            &&
            obj1.drawX <= obj2.drawX + obj2.width

        ) {return true;}
        else{return false;}
}

function beginLevel(){
    if(bossCounter==4){
        levelText = 'You Win!';
        setTimeout(function(){stopLoop()},2000);
    }
    else{levelText = 'Level ' + bossCounter;}
    setTimeout(function(){levelText=null;},2000);

}