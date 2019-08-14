function Player() {
	var cursor = new Cursor();
	var units = [];
	var selectedUnits = [];
	var unidadPrueba = new BaseUnit(100, 100);
	units.push(unidadPrueba);
	units.push(new BaseUnit(500, 100));
	units.push(new BaseUnit(500, 100));
	units.push(new BaseUnit(200, 100));
	units.push(new BaseUnit(450, 200));
	units.push(new BaseUnit(300, 100));
	units.push(new BaseUnit(600, 100));
	units.push(new BaseUnit(300, 400));
	units.push(new BaseUnit(300, 200));
	units.push(new BaseUnit(350, 120));
	selectedUnits.push(unidadPrueba);


	this.moveUnits = function(e) {
		e.preventDefault();
		for (var i=0; i<selectedUnits.length; i++) {
			selectedUnits[i].moveTo(GetXRelativeToCanvas(e), GetYRelativeToCanvas(e));
		}
	};

	function isSelected(unit) {
		return selectedUnits.indexOf(unit) != -1;
	};

	this.removeSelection = function() {
		selectedUnits = [];
	};

	this.actions = function(keys) {
		for (var i=0; i<keys.length; i++)
		{
			switch (keys[i])
			{
				case 27: this.removeSelection();break;
			}
		}
	};

	BaseUnit.canBeInNewPosition = function(unit) {
		for (var i=0; i<units.length; i++) {
			if (units[i].getId() != unit.id && collide(units[i], unit))
				return false;
		}
		return true;
	}.bind(this);

	BaseUnit.intersect = function(line, id, callback) {
		for (var i=0; i<units.length; i++) {
			if (units[i].getId() != id) {
				var lines = units[i].getCollisionLines();
				for (var j=0; j<lines.length; j++) {
					if (intersect(lines[j], line)) {
						return callback(lines[j]);
					}
				}
				
			}
		}
		callback();
	}

	cursor.onSelect = function(selectionRectangle) {
		var newSelection = [];
		for (var i=0; i<units.length; i++) {
			if (collide(selectionRectangle, units[i])) {
				newSelection.push(units[i]);
			};
		};
		if (newSelection.length > 0) {
			selectedUnits = newSelection;
		}

	}.bind(this);

	this.render = function() {
		cursor.render();
		for (var i=0; i<units.length; i++) {
			units[i].render(isSelected(units[i]));
		}
	};
	canvas.addEventListener("contextmenu", this.moveUnits);
};