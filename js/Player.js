function Player() {
	var units = [];
	var selectedUnits = [];
	var unidadPrueba = new BaseUnit(100, 100);
	units.push(unidadPrueba);
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

	this.render = function() {
		for (var i=0; i<units.length; i++) {
			units[i].render(isSelected(units[i]));
		}
	};
	canvas.addEventListener("contextmenu", this.moveUnits);
};