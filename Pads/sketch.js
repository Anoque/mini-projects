var	pads = [],
	k = -1,
	song;
	x = 20,
	y = 10,
	xp = 0,
	yp = 0,
	bg = [255, 255, 255];

function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	frameRate(100);
	xp = document.body.clientWidth / x;
	yp = document.body.clientHeight / y;

	for (var i = 0; i < x; i++) {
		pads.push([]);
		for (var j = 0; j < y; j++) {
			// console.log((i * (document.body.clientWidth / x)) + " " + (j * (document.body.clientHeight / y)));
			pads[i].push([i * (document.body.clientWidth / x), j * (document.body.clientHeight / y), bg, 0]);
		}
	}
}

function draw() {
	background(bg[0], bg[1], bg[2]);
	for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
			// if (mouseIsPressed) {
			if ((pads[i][j][0] <= mouseX) && ((pads[i][j][0] + xp) >= mouseX) && (pads[i][j][1] <= mouseY) && ((pads[i][j][1] + yp) >= mouseY)) {
				if (pads[i][j][3] < 1) {
					pads[i][j][2][0] = random(0, 255);
					pads[i][j][2][1] = random(0, 255);
					pads[i][j][2][2] = random(0, 255);
					pads[i][j][3] = 1;
				}
			} else if (pads[i][j][3] > 0) {
				pads[i][j][3] -= pads[i][j][3] * .1;
			}
			// }
			fill(pads[i][j][2][0] * pads[i][j][3], pads[i][j][2][1] * pads[i][j][3], pads[i][j][2][2] * pads[i][j][3]);
			rect(pads[i][j][0], pads[i][j][1], pads[i][j][0] + xp, pads[i][j][1] + yp);
		}
	}
}
