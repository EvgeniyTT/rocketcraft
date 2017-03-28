function checkKeyDown(event) {
    var event = event || window.event //window.event for IE

    var keyID = event.keyCode || event.which;
    var keyChar = String.fromCharCode(keyID);

    if (keyChar == "W") {
        player.isUp = true;
        event.preventDefault();
    }
    if (keyChar == "S") {
        player.isDown = true;
        event.preventDefault();
    }
    if (keyChar == "D") {
        player.isRight = true;
        event.preventDefault();
    }
    if (keyChar == "A") {
        player.isLeft = true;
        event.preventDefault();
    }
    if (keyChar == " ") {
        player.fire = true;
        event.preventDefault();
    }
}


function checkKeyUp(event){
    var event = event || window.event //window.event for IE

    var keyID = event.keyCode || event.which;
    var keyChar = String.fromCharCode(keyID);

    if (keyChar == "W") {
        player.isUp = false;
        event.preventDefault();
    }
    if (keyChar == "S") {
        player.isDown = false;
        event.preventDefault();
    }
    if (keyChar == "D") {
        player.isRight = false;
        event.preventDefault();
    }
    if (keyChar == "A") {
        player.isLeft = false;
        event.preventDefault();
    }

}
