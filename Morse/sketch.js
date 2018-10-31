var	silent = 0;
	step = 100,
	shortSound = 200, 
	longSound = 400,
	array = [],
	interval = 700,
	currentLetter = 0,
	currentPart = 0,
	text = "",
	lastDelay = shortSound,
	enable = false;

morseCode = {
	"A": [0, 1],
	"B": [1, 0, 0, 0],
	"C": [1, 0, 1, 0],
	"D": [1, 0, 0],
	"E": [0],
	"F": [0, 0, 1, 0],
	"G": [1, 1, 0],
	"H": [0, 0, 0, 0],
	"I": [0, 0],
	"J": [0, 1, 1, 1],
	"K": [1, 0, 1],
	"L": [0, 1, 0, 0],
	"M": [1, 1],
	"N": [1, 0],
	"O": [1, 1, 1],
	"P": [0, 1, 1, 0],
	"Q": [1, 1, 0, 1],
	"R": [0, 1, 0],
	"S": [0, 0, 0],
	"T": [1],
	"U": [0, 0, 1],
	"V": [0, 0, 0, 1],
	"W": [0, 1, 1],
	"X": [1, 0, 0, 1],
	"Y": [1, 0, 1, 1],
	"Z": [1, 1, 0, 0],
	"1": [0, 1, 1, 1, 1],
	"2": [0, 0, 1, 1, 1],
	"3": [0, 0, 0, 1, 1],
	"4": [0, 0, 0, 0, 1],
	"5": [0, 0, 0, 0, 0],
	"6": [1, 0, 0, 0, 0],
	"7": [1, 1, 0, 0, 0],
	"8": [1, 1, 1, 0, 0],
	"9": [1, 1, 1, 1, 0],
	"0": [1, 1, 1, 1, 1],
}

function setup() {
	var temp = [];
	createCanvas(document.body.clientWidth / 2, 200);
	frameRate(100);

	osc = new p5.TriOsc();
	osc.amp(0);
	fft = new p5.FFT();
	osc.start();
	osc.freq(0);

	var waveform = fft.waveform();
	beginShape();
	noLoop();
}

function draw() {
	background(255);

	if (enable) {
		if (currentLetter < array.length) {
			if (currentPart < array[currentLetter].length) {
				if (silent == 0) {
					morseSound(array[currentLetter][currentPart]);
				} else if (silent < 3 * (lastDelay + interval)) {
					silent++;
					redraw();
				} else {
					silent = 0;
					redraw();
				}
			} else {
				currentPart = 0;
				currentLetter++;
				silent = 1;
				setTimeout(redraw, interval);
			}

			var t = 0;
			fill(0);
			
			for (var i = 0; i < array[currentLetter].length; i++) {
				if (array[currentLetter][i] == 0) {
					t += 20;
					rect(i * 20 + t, 20, 20, 20, 10);
				} else {
					t += 20;
					rect(i * 20 + t, 20, 60, 20, 10);
					t += 40;
				}
			}
		} else {
			enable = false;
			currentLetter = 0;
			currentPart = 0;
		}
	}
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

function morseSound(type) {
	osc.freq(600);
	osc.amp(1);

	currentPart++;
	lastDelay = (type == 0) ? shortSound : longSound;
	setTimeout(stopSound, lastDelay);
}

function stopSound() {
	osc.freq(0);
	osc.amp(0);
	silent = 1;
	redraw();
}

function onStart(t) {
	text = document.getElementById('user-text').value.toUpperCase();
	array = [];

	for (var i = 0; i < text.length; i++) {
		if (typeof morseCode[text[i]] !== 'undefined')
			array.push(morseCode[text[i]]);
	}

	enable = true;
	redraw();
}