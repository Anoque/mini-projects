var	pads = [],
	k = -1,
	song;
	x = 20,
	y = 10,
	xp = 0,
	yp = 0,
	x1 = 0, 
	y1 = 0,
	bg = [255, 255, 255],
	type = 1;

function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	frameRate(100);

	xp = document.body.clientWidth / x;
	yp = document.body.clientHeight / y;

	for (var i = 0; i < x; i++) {
		pads.push([]);

		for (var j = 0; j < y; j++)
			pads[i].push([i * (document.body.clientWidth / x), j * (document.body.clientHeight / y), bg, 0]);
	}
}

function draw() {
	background(bg[0], bg[1], bg[2]);
	setDirection();

	for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
			var show = false;

			if (type == 1) {
				if ((pads[i][j][0] <= mouseX) && ((pads[i][j][0] + xp) >= mouseX) && (pads[i][j][1] <= mouseY) && ((pads[i][j][1] + yp) >= mouseY))
					show = true;
			} else if (type == 2) {
				if (i == x1 && j == y1)
					show = true;
			}

			if (show) {
				if (pads[i][j][3] < 1) {
					pads[i][j][2][0] = random(0, 255);
					pads[i][j][2][1] = random(0, 255);
					pads[i][j][2][2] = random(0, 255);
					pads[i][j][3] = 1;
				}
			} else if (pads[i][j][3] > 0) {
				pads[i][j][3] -= pads[i][j][3] * .1;
			}

			fill(pads[i][j][2][0] * pads[i][j][3], pads[i][j][2][1] * pads[i][j][3], pads[i][j][2][2] * pads[i][j][3]);
			rect(pads[i][j][0], pads[i][j][1], pads[i][j][0] + xp, pads[i][j][1] + yp);
		}
	}
}

function setDirection() {
	var vec = Math.floor(random(0, 4));

	if (vec == 0) {
		if (x1 < x - 1)
			x1 += 1;
		else
			setDirection();
	} else if (vec == 1) {
		if (y1 < y - 1)
			y1 += 1;
		else
			setDirection();
	} else if (vec == 2) {
		if (x1 > 0)
			x1 -= 1;
		else
			setDirection();
	} else if (vec == 3) {
		if (y1 > 0)
			y1 -= 1;
		else
			setDirection();
	}
}

function keyPressed() {
	if (key == "1") {
		type = 1;
	} else if (key == "2") {
		type = 2;
	}
}