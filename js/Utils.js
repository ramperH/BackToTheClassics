function DrawRect(x, y, w, d, color) {
	var oldStyle = ctx.fillStyle;
	if (color) {
		ctx.fillStyle = color;
	};
	ctx.fillRect(x, y, w, d);
	ctx.fillStyle = oldStyle;
};

function DrawLine(line) {
	ctx.beginPath();
	ctx.moveTo(line.p1.x, line.p1.y);
	ctx.lineTo(line.p2.x, line.p2.y);
	ctx.stroke();
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

function direction(a, b, c) {
	var val = (b.y-a.y)*(c.x-b.x)-(b.x-a.x)*(c.y-b.y);
	if (val == 0)
		return 0;//colinear
	else if(val < 0)
		return 2;//anti-clockwise direction
	return 1;//clockwise direction
};

//check whether point is on the line or not
function onLine(line, point) {
	if(point.x <= Math.max(line.p1.x, line.p2.x) && point.x <= Math.min(line.p1.x, line.p2.x) &&
		(point.y <= Math.max(line.p1.y, line.p2.y) && point.y <= Math.min(line.p1.y, line.p2.y)))
		return true;
	return false;
};

function intersect(line1, line2) {
	//four direction for two lines and points of other line
	var dir1 = direction(line1.p1, line1.p2, line2.p1);
	var dir2 = direction(line1.p1, line1.p2, line2.p2);
	var dir3 = direction(line2.p1, line2.p2, line1.p1);
	var dir4 = direction(line2.p1, line2.p2, line1.p2);

	if(dir1 != dir2 && dir3 != dir4)
		return true; //they are intersecting

	if(dir1==0 && onLine(line1, line2.p1)) //when p2 of line2 are on the line1
		return true;

	if(dir2==0 && onLine(line1, line2.p2)) //when p1 of line2 are on the line1
		return true;

	if(dir3==0 && onLine(line2, line1.p1)) //when p2 of line1 are on the line2
		return true;

	if(dir4==0 && onLine(line2, line1.p2)) //when p1 of line1 are on the line2
		return true;
	return false;
};

function collide(rect1, rect2) {
	return (
		((rect1.x + rect1.width) >= rect2.x && rect1.x <= (rect2.x+rect2.width)) &&
		((rect1.y + rect1.height) >=rect2.y && rect1.y <= (rect2.y + rect2.height))
	);
}

function GetXRelativeToCanvas(e) {
	return e.pageX - canvas.offsetLeft;
};

function GetYRelativeToCanvas(e) {
	return e.pageY - canvas.offsetTop;
};