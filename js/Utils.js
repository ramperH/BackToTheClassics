function DrawRect(x, y, w, d, color) {
	var oldStyle = ctx.fillStyle;
	if (color) {
		ctx.fillStyle = color;
	};
	ctx.fillRect(x, y, w, d);
	ctx.fillStyle = oldStyle;
};

function DrawRectWithBorder(x, y, w, d, color, borderColor) {
	DrawRect(x, y, w, d, color);

	var oldStyle = ctx.strokeStyle;
	if (borderColor) {
		ctx.strokeStyle = borderColor;
	};
	ctx.strokeRect(x-1, y-1, w+1, d+1);
	ctx.strokeStyle = oldStyle;
};

function GetXRelativeToCanvas(e) {
	return e.pageX - canvas.offsetLeft;
};

function GetYRelativeToCanvas(e) {
	return e.pageY - canvas.offsetTop;
};