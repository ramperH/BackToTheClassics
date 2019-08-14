var unitId = 0;
function BaseUnit(posx, posy) {
	var x = posx;
	var y = posy;
	var speed = 20;
	var width = 20;
	var height = 20;
	var id = unitId++;
	var newPosition = {x: -1, y: -1};

	this.getId = function(){return id};

	this.moveTo = function(newX, newY) {
		newPosition.x = newX;
		newPosition.y = newY;
	}

	this.move = function() {
		if (newPosition.x != -1)
		{
			// Mover hacia el punto objetivo.
			//si, al hacer el movimiento, voy a colisionar, buscar una mejor ruta
			var speedX = x <= newPosition.x ? speed : (-1)*speed;
			x += speedX;
			if ((newPosition.x - speed) <= x && (newPosition.x + speed) >= x)
				newPosition.x = -1;
		}
		if (newPosition.y != -1)
		{
			// Mover hacia el punto objetivo.
			//si, al hacer el movimiento, voy a colisionar, buscar una mejor ruta
			var speedY = y <= newPosition.y ? speed : (-1)*speed;
			y += speedY;
			if ((newPosition.y - speed) <= y && (newPosition.y + speed) >= y)
				newPosition.y = -1;
		}
	}

	this.render = function(isSelected) {
		this.move();
		DrawRect(x, y, width, height, isSelected ? "#00AA00": "");
	};
};