var coords = [],
	beginX,
	beginY,
	endX,
	endY,
	bias = 0.075,
	birds = 100,
	randX, randY;

function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	frameRate(100);

	beginX = 0;
	beginY = 0;
	endX = width;
	endY = height;
	
	for (var i = 0; i < birds; i++) {
		coords.push(getCoords());
	}
}

function draw() {
	background(0);
	noStroke();
	for (var i = 0; i < coords.length; i++) {
		if (coords[i][0] < beginX || coords[i][0] > endX || coords[i][1] < beginY || coords[i][1] > endY) {
			coords.splice(i, 1, getCoords());
		}

		fill(map(coords[i][0], 0, width, 0, 255), coords[i][6][1], coords[i][6][2]);
		ellipse(coords[i][0], coords[i][1], 5, 5);
		var temp = getBias(beginX, endX, coords[i][0], coords[i][2], coords[i][4]);
		var temp2 = getBias(beginY, endY, coords[i][1], coords[i][3], coords[i][5]);
		coords[i][2] = temp[0];
		coords[i][4] = temp[1];
		coords[i][3] = temp2[0];
		coords[i][5] = temp2[1];
		coords[i][0] += coords[i][2];
		coords[i][1] += coords[i][3];
	}

	if (coords.length < birds * 10) {
		coords.push(getCoords());
	}
}

function getCoords() {
	var x = random(beginX, endX);
	var y = random(beginY, endY);
	var dirX = 1;
	var dirY = random(-1, 1);
	var c = [random(0, 255), random(0, 255), random(0, 255)];

	return [x, y, dirX, dirY, true, true, c];
}

function getBias(start, end, coord, speed, dirX, dirY) {
	var middle = (end - start) / 2;
	
	if (coord >= end - speed * 100) {
		dirX = false;
	} else if (coord <= start + Math.abs(speed * 100)) {
		dirX = true;
	}

	if (dirX) {
		speed += bias + getRandomBias();
	} else {
		speed -= bias + getRandomBias();
	}

	return [speed, dirX];
}

function getRandomBias() {
	return random(-0.25, 0.25);
}