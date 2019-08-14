function Player() {
	var cursor = new Cursor();
	var units = [];
	var selectedUnits = [];
	var unidadPrueba = new BaseUnit(100, 100);
	var unidadPrueba2 = new BaseUnit(500, 100);
	units.push(unidadPrueba);
	units.push(unidadPrueba2);
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