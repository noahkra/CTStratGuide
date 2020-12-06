var world = 1;
var level = 1;

function changeLevel(selectedLevel) {
	d3.select("#svgChevLeft").style("visibility", "visible");
	d3.select("#svgChevRight").style("visibility", "visible");
	switch (selectedLevel) {
		case "n":
			changeLevel(++level);
			return;
		case "p":
			changeLevel(--level);
			return;
		case 1:
			d3.select("#svgChevLeft")
				.style("visibility", "hidden");
			break;
		case 10:
			d3.select("#svgChevRight")
				.style("visibility", "hidden");
			break;
	}
	d3.select("img")
		.attr("src", `./levels/${world}-${selectedLevel}.png`);
	level = selectedLevel;
}

function changeWorld(forward) {
	if (forward) {
		world++;
	} else {
		world--;
	}

	changeLevel(1);

	// Handle button visibility in first and last worlds
	d3.select("#nextWorld").style("display", "block");
	d3.select("#prevWorld").style("display", "block");

	if (world === 1) {
		d3.select("#prevWorld").style("display", "none");
	}

	if (world === 9) {
		d3.select("#nextWorld").style("display", "none");
	}
}

function selectLevel() {
	loadStrats();
	d3.select("#levelSelection")
		.style("opacity", "0.5");
	d3.select("#levelSelectionText")
		.style("opacity", "0.2");
	d3.select("#popup")
		.style("visibility", "visible")
		.style("opacity", "1")
		.style("transform", "scale(1)");

}

function deselectLevel() {
	d3.select("#levelSelection")
		.style("opacity", "1");
	d3.select("#levelSelectionText")
		.style("opacity", "1");
	d3.select("#popup")
		.style("visibility", "hidden")
		.style("opacity", "0")
		.style("transform", "scale(0.95)");
}

function loadStrats() {
	d3.csv("strats.csv", function(data) {
		console.log(data);
	});
}