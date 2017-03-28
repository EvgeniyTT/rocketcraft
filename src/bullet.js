function Bullet(){
    this.srcX = 0;
    this.srcY = 115;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 30;
    this.height = 17;
    this.speed = 2;

    this.draw = function() {
        ctxBullets.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
            this.drawX, this.drawY, this.width, this.height);
    }

    this.update = function(){
        this.drawX += this.speed;
        this.shot();
        if(this.drawX>gameWidth){
            this.destroy();
        }
    }

    this.destroy = function(){
        bullets.splice(bullets.indexOf(this),1);
    }


    this.shot = function(){
        for (var i = 0; i<enemies.length; i++){
                if( clash(this,enemies[i]) ) {
                    this.destroy();
                    if (enemies[i] instanceof Boss){
                        enemies[i].health--;
                        if(enemies[i].health==0){
                            enemies[i].destroy();
                        }
                    }
                    else{enemies[i].destroy();}
                    player.score++;
                }
        }
    }
}

function enemyStraightRocket(){
    this.srcX = 0;
    this.srcY = 295;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 45;
    this.height = 19;
    this.speed = 10;

    this.update = function(){
        this.drawX -= this.speed;
        this.shot();
        if(this.drawX<0){
            this.destroy();
        }
    }

    this.shot = function(){
            if( clash(this,player) ){
                this.destroy();
                player.health--;
            }
    }

    this.destroy = function(){
        enemyBullets.splice(enemyBullets.indexOf(this),1);
    }

}

function enemySteeringRocket(){
    this.srcX = 0;
    this.srcY = 550;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 43;
    this.height = 77;
    this.speed = 3;

    this.update = function(){
        var newVector = makeVector(player.drawX + player.width/2, player.drawY + player.height/2, this.drawX + this.width/2, this.drawY + this.height/2);

        this.newX = newVector[0]*this.speed;
        this.newY = newVector[1]*this.speed;
        var angleX = newVector[2];

        if(this.drawX+this.newX>this.drawX && this.drawY+this.newY>this.drawY && 20<angleX && angleX<70){this.srcX = 485;this.srcY = 552; this.width = 60; this.height = 62;}
        else if (this.drawY+this.newY>=this.drawY && 70<angleX && angleX<90)                              {this.srcX = 394;this.srcY = 559; this.width = 75; this.height = 44;}
        else if (this.drawX+this.newX>this.drawX && this.drawY+this.newY<this.drawY && 20<angleX && angleX<70){this.srcX = 233;this.srcY = 553; this.width = 60; this.height = 62;}
        else if (this.drawX+this.newX>=this.drawX && angleX<20)                                 {this.srcX = 559;this.srcY = 545; this.width = 44; this.height = 77;}
        else if (this.drawY+this.newY<this.drawY && 70<angleX && angleX<90)                               {this.srcX = 136;this.srcY = 564; this.width = 75; this.height = 44;}
        else if (this.drawX+this.newX<this.drawX && this.drawY+this.newY>this.drawY && 20<angleX && angleX<70){this.srcX = 312;this.srcY = 555; this.width = 60; this.height = 62;}
        else if (this.drawX+this.newX<this.drawX && this.drawY+this.newY<this.drawY && 20<angleX && angleX<70){this.srcX = 61;this.srcY = 552; this.width = 60; this.height = 62;}
        else if (this.drawX+this.newX<this.drawX && angleX<20)                                   {this.srcX = 0;this.srcY = 550; this.width = 43; this.height = 77;}

        this.drawX += this.newX;
        this.drawY += this.newY;
        this.shot();
        if(this.drawX<0){
            this.destroy();
        }
    }

    this.shot = function(){
        if( clash(this,player) ) {
            this.destroy();
            player.health--;
        }

        for (var i = 0; i<bullets.length; i++) {
            if ( clash(this,bullets[i]) ) {
                this.destroy();
                bullets[i].destroy();
            }
        }
    }
}

function enemyBomb(){
    this.srcX = 0;
    this.srcY = 415;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 45;
    this.height = 29;
    this.speed = 2;
    this.vector = makeRandomVector();


    var exploseDelay = 0;

    this.update = function(){
        this.newX = Math.abs(this.vector[0]*this.speed);
        this.newY = this.vector[1]*this.speed;

        this.drawX -= this.newX;
        this.drawY -= this.newY;
        this.shot();

        if ( this.speed==0){
            exploseDelay++
        }

        if(this.drawX<0 ||  exploseDelay==20){
            this.destroy();
        }
    }

    this.shot = function() {
        if (clash(this, player)) {
            this.destroy();
            player.health--;
        }
    }

    this.explose = function(){
        this.srcX = 68;
        this.srcY = 332;
        this.width = 206;
        this.height = 196;
        this.drawX -= 85;
        this.drawY -= 80;
        this.speed = 0;
    }


}


enemyStraightRocket.prototype = new Bullet()
enemySteeringRocket.prototype = new enemyStraightRocket()
enemyBomb.prototype = new enemyStraightRocket()