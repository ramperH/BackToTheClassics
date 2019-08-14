function Cursor() {
	var shouldRender = false;
	var startPoint = {x: 0, y: 0};
	var size = {width: 5, height: 5};
	var color = "rgba(93, 178, 72, 0.5607843137254902)";
	var borderColor = "#222";

	this.startDrawing = function(e) {
		if (e.which != 1)return;
		startPoint = {x: GetXRelativeToCanvas(e), y: GetYRelativeToCanvas(e)};
		this.onMove(e);
		shouldRender = true;
	};
	this.onSelect = function(){};

	this.stopDrawing = function(e) {
		if (e.which != 1)return;
		shouldRender = false;
		var rect = {
			x: startPoint.x,
			y: startPoint.y,
			width: size.width,
			height: size.height
		};

		if (rect.width < 0) {
			rect.x = rect.x + rect.width;
			rect.width *= -1;
		};
		if (rect.height < 0) {
			rect.y = rect.y + rect.height;
			rect.height *= -1;
		};
		this.onSelect(rect);
	};

	this.onMove = function(e) {
		size.width = GetXRelativeToCanvas(e) - startPoint.x;
		size.height = GetYRelativeToCanvas(e) - startPoint.y;
	};

	this.render = function() {
		if (shouldRender) {
			DrawRectWithBorder(startPoint.x, startPoint.y, size.width, size.height, color, borderColor);
		};
	};

	canvas.addEventListener("mousedown", this.startDrawing.bind(this));
	canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
	canvas.addEventListener("mouseout", this.stopDrawing.bind(this));
	canvas.addEventListener("mousemove", this.onMove);
}