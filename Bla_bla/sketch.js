var	dots = [],
	sizeX = 800,
	sizeY = 600,
	colors = [],
	type = 1;

function setup() {
	sizeX = document.body.clientWidth;
	sizeY = document.body.clientHeight;
	dots.push(random(0, sizeX), random(0, sizeY));
	colors.push([random(0, 255), random(0, 255), random(0, 255), random(10, 50)]);
	createCanvas(sizeX, sizeY);
}

function draw() {
	background(255);

	if (mouseIsPressed) {
		dots.push([mouseX, mouseY]);
		colors.push([random(0, 255), random(0, 255), random(0, 255)]);
	}

	if (dots.length > 1) {
		for (var i = 1; i < dots.length; i++) {
			fill(colors[i - 1][0], colors[i - 1][1], colors[i - 1][2]);
			if (type == 1) {
				if (dots.length > 2 && i > 1) {
					fill(colors[i - 2][0], colors[i - 2][1], colors[i - 2][2]);
					triangle(dots[i - 2][0], dots[i - 2][1], dots[i - 1][0], dots[i - 1][1], dots[i][0], dots[i][1]);
				}
			} else if (type == 2) {
				rect(dots[i - 1][0], dots[i - 1][1], mouseX - dots[i][0], mouseY - dots[i][1]);
			} else if (type == 3) {
				ellipse(dots[i][0], dots[i][1], colors[i - 1][0], colors[i - 1][1]);
			}
		}
	}
	
}

function keyPressed() {
	if (key == " ") {
		dots.push([mouseX, mouseY]);
		colors.push([random(0, 255), random(0, 255), random(0, 255)]);
	} else if (key == "1") {
		type = 1;
	} else if (key == "2") {
		type = 2;
	} else if (key == "3") {
		type = 3;
	} else if (key == "4") {
		dots = [];
		colors = [];
	}
}