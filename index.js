var world = 1;
var level = 1;

var settings = {
	"colon": 1
};

document.addEventListener('DOMContentLoaded', () => {
	for (let i in settings) {
		if (getCookie(i) !== "") { settings[i] = parseInt(getCookie(i)); }
	}
}, false);

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

	d3.select("#popupHeader")
		.text(`${world}${settings.colon ? ":" : "-"}${level} STRATEGIES`);
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

	d3.select("#popupHeader")
		.text(`${world}${settings.colon ? ":" : "-"}${level} STRATEGIES`);

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

function setCookie(cname, cvalue) {
	var expires = "expires=1922624771370";
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}