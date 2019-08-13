function DrawRect(x, y, w, d) {
	ctx.fillRect(x, y, w, d);
};

function GetXRelativeToCanvas(e) {
	return e.pageX - canvas.offsetLeft;
};

function GetYRelativeToCanvas(e) {
	return e.pageY - canvas.offsetTop;
};