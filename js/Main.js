var GameInfo = {
	elements: [
		new Cursor(),
		new Player()
	]
	
};

function Start() {
	setInterval(Game, 60);
};

function Game() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0; i<GameInfo.elements.length; i++) {
		GameInfo.elements[i].render();
	}
};

Start();