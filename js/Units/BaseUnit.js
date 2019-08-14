var unitId = 0;
function BaseUnit(posx, posy) {
	this.x = posx;
	this.y = posy;
	var speed = 20;
	this.width = 20;
	this.height = 20;
	var id = unitId++;
	var newPosition = {x: -1, y: -1};

	var plannedMovement = [];

	this.getId = function(){return id};

	this.moveTo = function(newX, newY) {
		newPosition.x = newX;
		newPosition.y = newY;
		addLine.bind(this)(this.x, this.y, newX, newY);
	}
	function addLine(oldX, oldY, newX, newY) {
		var newLine = {p1: {x: oldX, y: oldY}, p2: {x: newX, y: newY}};
		BaseUnit.intersect(newLine, id, function(line){this.processCollisions(newLine, line)}.bind(this));
	};
	this.processCollisions = function (newLine, line) {
		if (line) {
			var extraX = line.p1.x > line.p2.x ? this.width + 5 : (-1)*(this.width + 5);
			var extraY = line.p1.y > line.p2.y ? this.height+5 : (-1)*(this.height+5);
			newLine.p2.x = line.p1.x + extraX;
			newLine.p2.y = line.p1.y + extraY;
			plannedMovement.push(newLine)
			addLine.bind(this)(newLine.p2.x, newLine.p2.y, newPosition.x, newPosition.y);
			return;
		}
		plannedMovement.push(newLine)
	}

	this.getCollisionLines = function() {
		var lines = [];
		lines.push({p1: {x: this.x, y: this.y}, p2: {x: this.x, y: this.y+this.height}});
		//lines.push({p1: {x: this.x, y: this.y}, p2: {x: this.x+this.width, y: this.y}});
		lines.push({p1: {x: this.x, y: this.y+this.height}, p2: {x: this.x+this.width, y: this.y+this.height}});
		lines.push({p1: {x: this.x+this.width, y: this.y+this.height}, p2: {x: this.x+this.width, y: this.y}});
		return lines;
	}

	this.move = function() {
		/*var newX = this.x;
		var newY = this.y;
		if (newPosition.x != -1)
		{
			// Mover hacia el punto objetivo.
			//si, al hacer el movimiento, voy a colisionar, buscar una mejor ruta
			var speedX = this.x <= newPosition.x ? speed : (-1)*speed;
			newX += speedX;
			if ((newPosition.x - speed) <= this.x && (newPosition.x + speed) >= this.x)
				newPosition.x = -1;
		}
		if (newPosition.y != -1)
		{
			// Mover hacia el punto objetivo.
			//si, al hacer el movimiento, voy a colisionar, buscar una mejor ruta
			var speedY = this.y <= newPosition.y ? speed : (-1)*speed;
			newY += speedY;
			if ((newPosition.y - speed) <= this.y && (newPosition.y + speed) >= this.y)
				newPosition.y = -1;
		}

		if (BaseUnit.canBeInNewPosition({width: this.width-10, height: this.height-10, x: newX, y: newY, id: id})) {
			this.x = newX;
			this.y = newY;
		}*/
	}

	this.render = function(isSelected) {
		this.move();
		for (var i=0; i<plannedMovement.length; i++) {
			DrawLine(plannedMovement[i]);
		}
		DrawRect(this.x, this.y, this.width, this.height, isSelected ? "#00AA00": "");
	};
};