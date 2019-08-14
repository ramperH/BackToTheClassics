var GameInfo = {
	elements: [
		new Player()
	],
	pressedKeys: []
};

function Start() {
	setInterval(Game, 60);
};

function Game() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0; i<GameInfo.elements.length; i++) {
		if (typeof GameInfo.elements[i].actions == 'function')
			GameInfo.elements[i].actions(GameInfo.pressedKeys);
		GameInfo.elements[i].render();
	}
};

function keyDown(e) {
	if (GameInfo.pressedKeys.indexOf(e.keyCode) == -1) {
		GameInfo.pressedKeys.push(e.keyCode);
	}
};

function keyUp(e) {
	var pressedKey = GameInfo.pressedKeys.indexOf(e.keyCode);
	if (pressedKey != null){
		GameInfo.pressedKeys.splice(pressedKey, 1);
	}
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
Start();