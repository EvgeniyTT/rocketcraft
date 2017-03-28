function Player(){
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 250;
    this.width = 150;
    this.height = 60;
    this.speed = 5;
    this.health = 5;
    this.score = 0;

    //For keys
    this.isUp = false;
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
    this.fire = false;

    this.draw = function() {
        clearCtxPlayer();
        ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
            this.drawX, this.drawY, this.width, this.height);
    }

    this.update = function() {

        if(this.health<0){
            levelText = 'Game Over';
            setTimeout(function(){stopLoop()},2000);
        }

        if(this.drawX<0) {this.drawX=0}
        if(this.drawX>gameWidth-this.width) {this.drawX=gameWidth-this.width}
        if(this.drawY<0) {this.drawY=0}
        if(this.drawY>gameHeight-this.height) {this.drawY=gameHeight-this.height}

        for(var i=0; i<enemies.length; i++) {
            if(
                clash(this,enemies[i])
                )
            {
                this.health--;
                if(!(enemies[i] instanceof Boss)){
                    enemies[i].destroy();
                }
            }
        }
        this.startFire();
        this.chooseDir();

    }

    this.chooseDir = function() {
        if(this.isUp){
            this.drawY -= this.speed;
        }
        if(this.isDown){
            this.drawY += this.speed;
        }
        if(this.isRight){
            this.drawX += this.speed;
        }
        if(this.isLeft){
            this.drawX -= this.speed;
        }
    }

    this.startFire = function(){
        if(this.fire){
            var bul = new Bullet()
            bul.drawX = this.drawX+this.width;
            bul.drawY = this.drawY+this.height/2;
            bullets.push(bul);
        }
        this.fire = false;
    }

}



