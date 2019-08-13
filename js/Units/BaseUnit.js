var unitId = 0;
function BaseUnit(posx, posy) {
	var x = posx;
	var y = posy;
	var width = 20;
	var height = 20;
	var id = unitId++;

	this.getId = function(){return id};

	this.moveTo = function(newX, newY) {
		x = newX;
		y = newY;
	}

	this.render = function(isSelected) {
		DrawRect(x, y, width, height, isSelected ? "#00AA00": "");
	};
};