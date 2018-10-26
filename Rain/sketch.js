var	lines = [],
	k = -1,
	song;

function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	frameRate(1000);

	for (var i = 0; i < 100; i++) {
		lines.push([random(0, width), random(0, 50), random(20, 60), random(1, 10)]);
	}
}

function draw() {
	background(20, 20, 255);
	stroke(200, 200, 255);
	k = (mouseX / width) * 2 - 1;
	speed = (mouseY / height) * 2 + 2;
	
	for (var i = 0; i < lines.length; i++) {
		line(lines[i][0], lines[i][1], lines[i][0] + (k * (lines[i][2])) * 0.2, lines[i][1] + lines[i][2]);
		lines[i][1] += lines[i][3] * speed;
		lines[i][0] += k;

		if (lines[i][1] >= height) {
			lines[i] = [random(0, width), random(-250, -50), random(20, 60), random(1, 5)];
		}
	}
}