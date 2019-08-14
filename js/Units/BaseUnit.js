var unitId = 0;
function BaseUnit(posx, posy) {
	this.x = posx;
	this.y = posy;
	var speed = 20;
	this.width = 20;
	this.height = 20;
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
			var speedX = this.x <= newPosition.x ? speed : (-1)*speed;
			this.x += speedX;
			if ((newPosition.x - speed) <= this.x && (newPosition.x + speed) >= this.x)
				newPosition.x = -1;
		}
		if (newPosition.y != -1)
		{
			// Mover hacia el punto objetivo.
			//si, al hacer el movimiento, voy a colisionar, buscar una mejor ruta
			var speedY = this.y <= newPosition.y ? speed : (-1)*speed;
			this.y += speedY;
			if ((newPosition.y - speed) <= this.y && (newPosition.y + speed) >= this.y)
				newPosition.y = -1;
		}
	}

	this.render = function(isSelected) {
		this.move();
		DrawRect(this.x, this.y, this.width, this.height, isSelected ? "#00AA00": "");
	};
};