function Cursor() {
	var shouldRender = false;
	var startPoint = {x: 0, y: 0};
	var size = {width: 5, height: 5};

	this.startDrawing = function(e) {
		startPoint = {x: GetXRelativeToCanvas(e), y: GetYRelativeToCanvas(e)};
		this.onMove(e);
		shouldRender = true;
	};

	this.stopDrawing = function() {
		shouldRender = false;
	};

	this.onMove = function(e) {
		size.width = GetXRelativeToCanvas(e) - startPoint.x;
		size.height = GetYRelativeToCanvas(e) - startPoint.y;
	};

	this.render = function() {
		if (shouldRender) {
			DrawRect(startPoint.x, startPoint.y, size.width, size.height);
		}
	};

	canvas.addEventListener("mousedown", this.startDrawing.bind(this));
	canvas.addEventListener("mouseup", this.stopDrawing);
	canvas.addEventListener("mousemove", this.onMove);
}