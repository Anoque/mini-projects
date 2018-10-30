var defaultMap = "[[0,0,null,0,0,null,0,null,0,0,null,0,0,0,0,0,0,0,0,0],[0,0,null,0,0,null,0,null,0,0,null,null,null,null,0,null,null,0,0,0],[0,0,null,0,0,null,0,null,0,0,0,null,0,0,0,null,null,0,0,0],[0,0,null,0,0,0,0,0,0,0,0,0,0,0,0,null,null,0,0,0],[0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null],[0,0,null,0,0,null,0,0,0,0,0,0,null,null,0,0,0,null,0,0],[0,0,null,0,0,null,0,null,0,null,0,0,0,0,0,0,0,null,0,null],[0,0,null,0,0,null,0,null,0,null,null,null,null,null,null,null,0,null,0,0],[0,0,0,0,0,0,0,null,null,null,0,null,null,0,0,null,0,0,0,0],[null,null,null,null,null,null,0,null,0,null,0,0,0,0,0,0,0,0,0,0]]";

var	array = [],
	countX = 40,
	countY = 20,
	startX = 0,
	startY = 0,
	endX = countX - 1, 
	endY = countY - 1;
	found = -1,
	stop = false,
	drawCount = 0,
	lastCells = [],
	search = false,
	wayToStart = false,
	wayX = endX,
	wayY = endY;


function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	frameRate(10);

	for (var i = 0; i < countY; i++) {
		array.push([]);
		for (var j = 0; j < countX; j++) {
			array[i].push(0);
		}
	}

	lastCells = [[startX, startY]];
	textSize(width / countX / 2);
	textAlign(CENTER);
}

function draw() {
	var sizeX = map(1, 0, countX, 0, width);
	var sizeY = map(1, 0, countY, 0, height);
	background(20, 20, 255);

	if (mouseIsPressed) {
		var i = Math.floor(map(mouseY, 0, height, 0, countY));
		var j = Math.floor(map(mouseX, 0, width, 0, countX));
		array[i][j] = null;
	}

	if (search)
		searchExit();
	if (wayToStart)
		searchWayToStart();

	for (var i = 0; i < countY; i++) {
		for (var j = 0; j < countX; j++) {
			if (array[i][j] == 0)
				fill(255);
			else if (array[i][j] == null)
				fill(50);
			else if (array[i][j] > 0)
				fill(255, 186, 107);
			else if (array[i][j] < 0)
				fill(61, 235, 52);

			if (startX == j && startY == i)
				fill(255, 255, 0);
			else if (endX == j && endY == i)
				fill(0, 0, 255);

			rect(sizeX * j, sizeY * i, sizeX * j + sizeX, sizeY * i + sizeY);

			if (!(startX == j && startY == i || array[i][j] == null)) {
				noStroke();
				fill(0);
				text(Math.abs(array[i][j]), sizeX * j + sizeX / 2, sizeY * i + sizeY / 2);
				stroke(0);
			}
		}
	}
}

function keyPressed() {
	if (!search) {
		if (key == " ") {
			startSearch();
		} else if (key == "d") {
			loadMap();
		} else if (key == "l") {
			navigator.clipboard.readText().then(text => {
				try {
					loadMap(text);
				} catch(e) {
					alert(e);
					loadMap();
				}
			}).catch(err => {
				loadMap();
			});
		} else if (key == "g") {
			navigator.clipboard.writeText(JSON.stringify(array)).then(() => {
				alert('Map loaded');
			}).catch(err => {
				alert('Error to get a map', err);
			});
		} else if (key == "s") {
			startX = Math.floor(map(mouseX, 0, width, 0, countX));
			startY = Math.floor(map(mouseY, 0, height, 0, countY));
			lastCells = [[startY, startX]];
		} else if (key == "e") {
			endX = Math.floor(map(mouseX, 0, width, 0, countX));
			endY = Math.floor(map(mouseY, 0, height, 0, countY));
		}
	}
}

function loadMap(str) {
	if (typeof str === 'undefined') {
		alert('loaded default map');
		str = defaultMap;
	}

	array = JSON.parse(str);
	countY = array.length;
	countX = (array.length > 0) ? array[0].length : 0;
	endY = countY - 1;
	endX = countX - 1;
	wayX = endX;
	wayY = endY;
}

function startSearch() {
	frameRate(50);
	search = true;
}

function searchExit() {
	if (lastCells.length > 0) {
		var marked = [];

		for (var i = 0; i < lastCells.length; i++) {
			if (lastCells[i][0] - 1 >= 0)
				marked.push(markCell(lastCells[i][0] - 1, lastCells[i][1], lastCells[i][0], lastCells[i][1]));
			if (lastCells[i][0] + 1 < countY)
				marked.push(markCell(lastCells[i][0] + 1, lastCells[i][1], lastCells[i][0], lastCells[i][1]));
			if (lastCells[i][1] - 1 >= 0)
				marked.push(markCell(lastCells[i][0], lastCells[i][1] - 1, lastCells[i][0], lastCells[i][1]));
			if (lastCells[i][1] + 1 < countX)
				marked.push(markCell(lastCells[i][0], lastCells[i][1] + 1, lastCells[i][0], lastCells[i][1]));
		}

		lastCells = marked.filter(function(value) {
			return value != false;
		});
	} else {
		console.log('The search a ways is over');
		search = false;

		if (!wayToStart)
			noLoop();
	}
}

function markCell(y, x, y1, x1) {
	if (array[y][x] == 0) {
		if (y == endY && x == endX) {
			array[y][x] = array[y1][x1] + 1;
			setTimeout(startWayToFinish, 10);
		} else {
			array[y][x] = array[y1][x1] + 1;
			return [y, x];
		}
	}

	return false;
}

function startWayToFinish() {
	wayToStart = true;
}

function checkStepsInCell(x, y, steps) {
	return array[y][x] == steps - 1;
}

function searchWayToStart() {
	if (wayX != startX || wayY != startY) {
		if (wayX - 1 >= 0) {
			if (checkStepsInCell(wayX - 1, wayY, array[wayY][wayX])) {
				array[wayY][wayX] = -array[wayY][wayX];
				wayX -= 1;
				return;
			}
		} 
		if (wayX + 1 < countX) {
			if (checkStepsInCell(wayX + 1, wayY, array[wayY][wayX])) {
				array[wayY][wayX] = -array[wayY][wayX];
				wayX += 1;
				return;
			}
		}
		if (wayY - 1 >= 0) {
			if (checkStepsInCell(wayX, wayY - 1, array[wayY][wayX])) {
				array[wayY][wayX] = -array[wayY][wayX];
				wayY -= 1;
				return;
			}

		} 
		if (wayY + 1 < countY) {
			if (checkStepsInCell(wayX, wayY + 1, array[wayY][wayX])) {
				array[wayY][wayX] = -array[wayY][wayX];
				wayY += 1;
				return;
			}
		}
	}

	console.log('The search a way to exit is over');
	array[wayY][wayX] = -array[wayY][wayX];
	wayToStart = false;

	if (!search)
		noLoop();
}