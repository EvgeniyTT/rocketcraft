function Enemy(){
    this.width = 77;
    this.height = 33;
    this.speed = 8;

    this.srcX = 0;
    this.srcY = 68;

    this.drawX = Math.floor(Math.random() * gameWidth/2) + gameWidth;
    this.drawY = Math.floor(Math.random() * (gameHeight - this.height));

    var flyDirection = makeVector(this.drawX,this.drawY,0, Math.random()*gameHeight);

    this.newX = this.speed * flyDirection[0];
    this.newY = this.speed * flyDirection[1];


    this.draw = function(){
    ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
    }

    this.update = function(){
        this.drawX -= this.newX;
        this.drawY -= this.newY;
        if(this.drawX + this.width<0){
            this.destroy();
        }
    }

    this.destroy = function(){
        enemies.splice(enemies.indexOf(this),1);
    }

    this.flyAround = function(){
        var newVector = makeRandomVector();
        this.newX = newVector[0]*this.speed;
        this.newY = newVector[1]*this.speed;

        if(this.drawX<=gameWidth/3 && this.newX>0){
            this.newX = -this.newX;
        }
        if((this.drawY<=0 && this.newY>0) || (this.drawY+this.height>=gameHeight && this.newY<0)){
            this.newY = -this.newY;
        }
    }

}

//-----------------------------------------------------------------//
//for creating enemies
var spawnInterval;
var spawnTime = 800;
var spawnAmount = 3;

var straightFireInterval
var steeringFireInterval
var makeBombInterval

function spawnEnemy(count){
    if( ((player.score-player.score%50)/50) == bossCounter){
        if (!boss.isAlive) {
            boss.reborn();
            enemies.push(boss);
        }
    }
    else {
        var addList = enemies.length;
        for (var i = addList; i < addList+count; i++) {
            enemies[i] = new Enemy();
        }
    }
}

function startCreatingEnemies(){
    //stopCreatingEnemies();
    spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)},spawnTime);
}

function stopCreatingEnemies(){
    clearInterval(spawnInterval);
}
//-----------------------------------------------------------------//



function Boss(){
    this.width;
    this.height;
    this.speed = 6;

    this.srcX;
    this.srcY;

    this.health = 15;
    this.isAlive = false;

    this.destroy = function(){
        enemies.splice(enemies.indexOf(this),1);
        bossCounter++;
        this.isAlive = false;
        clearInterval(straightFireInterval);
        clearInterval(steeringFireInterval);
        clearInterval(makeBombInterval)
        setTimeout(function(){beginLevel()},2000);
    }

    this.reborn = function(){
        this.isAlive = true;

        this.drawX = Math.floor(Math.random() * gameWidth/2) + gameWidth;
        this.drawY = Math.floor(Math.random() * (gameHeight - this.height));
        this.health = 15;

        if(bossCounter==1){
            this.srcX = 2; this.srcY = 145; this.width=198; this.height=135;
            straightFireInterval = setInterval(function(){boss.straightFire()}, 850);
        }
        if(bossCounter==2){
            this.srcX = 0; this.srcY = 650; this.width=95; this.height=115; this.health=20;
            steeringFireInterval = setInterval(function(){boss.steeringFire()}, 2000);
            makeBombInterval = setInterval(function(){boss.makeBomb()}, 1000);
        }
        if(bossCounter==3){
            this.srcX = 2; this.srcY = 780; this.width=168; this.height=116; this.health=25;
            straightFireInterval = setInterval(function(){boss.straightFire()}, 900);
            steeringFireInterval = setInterval(function(){boss.steeringFire()}, 3000);
            makeBombInterval = setInterval(function(){boss.makeBomb()}, 1500);
        }

    }


    this.straightFire = function(){
            var bul = new enemyStraightRocket()
            bul.drawX = this.drawX;
            bul.drawY = this.drawY+this.height/2;
            enemyBullets.push(bul);
    }

    this.steeringFire = function(){
        var bul = new enemySteeringRocket()
        bul.drawX = this.drawX + this.width;
        bul.drawY = this.drawY + this.height/2;
        enemyBullets.push(bul);
    }

    this.makeBomb = function(){
        var bul = new enemyBomb();
        setTimeout(function(){bul.explose()}, ((Math.random()*3000)+2000) );
        bul.drawX = this.drawX + this.width;
        bul.drawY = this.drawY + this.height/2;
        enemyBullets.push(bul);
    }

    this.update = function() {
        if (this.drawX <= gameWidth / 3 || this.drawX + this.width >= gameWidth
            || this.drawY <= 0 || this.drawY + this.height >= gameHeight) {
            this.flyAround();
        }

        this.drawX -= this.newX;
        this.drawY -= this.newY;
        if (this.drawX + this.width < 0) {
            this.destroy();
        }
    }
}

Boss.prototype = new Enemy();