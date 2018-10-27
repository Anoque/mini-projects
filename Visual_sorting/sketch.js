var	array = [],
	widthBar = 0,
	heightBar = 0,
	count = 100;

function setup() {
	var temp = [];
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	frameRate(10);

	for (var i = 1; i <= count; i++) {
		temp.push(i);
	}
	for (var i = 0; i < count; i++) {
		array.push(temp.splice(random(0, count - i - 1), 1)[0]);
	}

	widthBar = width / count;
	heightBar = height / count;

	osc = new p5.TriOsc();
	osc.amp(.5);
	fft = new p5.FFT();
	osc.start();
}

function draw() {
	background(20, 20, 255);
	var waveform = fft.waveform();
	var justDraw = false;
	beginShape();

	for (var i = 0; i < array.length; i++) {
		if (!justDraw) {
			for (var j = i; j < array.length; j++) {
				if (array[i] > array[j]) {
					array[i] += array[j];
					array[j] = array[i] - array[j];
					array[i] -= array[j];

					fill(20);
					justDraw = true;

					// sound
					osc.freq(880 / count * (i + 1));
					osc.amp(array[j] / 100);
					sleep(1);

					osc.freq(880 / count * (j + 1));
					osc.amp(array[j] / 100);
					sleep(1);
				}
			}
		}

		rect(i * widthBar, height - (heightBar * array[i]), widthBar, height);
		fill(255);
	}

	if (!justDraw) {
		noLoop();
		osc.freq(0);
		osc.amp(0);
	}
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}