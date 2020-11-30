var world = 1;

function changeLevel(level) {
	d3.select("img").attr("src", `./levels/${world}-${level}.png`);
}

function play() {
	alert("This is where a popup with strategies would show, but I haven't done that yet.");
}