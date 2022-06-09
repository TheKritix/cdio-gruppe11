
const deltaX = 3; //%
const deltaY = 2; //%

//var input = [];
var testInput1 = [
	{ x: 82, y:34, name: "[]" },
	{ x: 310, y:136, name: "[]" },
	{ x: 85, y:138, name: "JD" },
	{ x: 519, y:200, name: "[]"},
	{ x: 316, y:196, name: "JC"},
	{ x: 1190, y:134, name: "[]"},
	{ x: 522, y:265, name: "AH" },
	{ x: 1042, y:201, name: "[]" },
	{ x: 894, y:334, name: "[]" },
	{ x: 890, y:264, name: "[]" },
	{ x: 892, y:199, name: "[]" },
	{ x: 707, y:199, name: "[]" },
	{ x: 706, y:270, name: "[]" },
	{ x: 1184, y:420, name: "[]" },
	{ x: 1183, y:500, name: "[]" },
	{ x: 707, y:337, name: "QS" },
	{ x: 891, y:416, name: "7C" },
	{ x: 1046, y:420, name: "[]" },
	{ x: 1047, y:334, name: "[]" },
	{ x: 1045, y:270, name: "[]" },
	{ x: 500, y:140, name: "[]" },
	{ x: 714, y:142, name: "[]" },
	{ x: 884, y:139, name: "[]" },
	{ x: 1176, y:203, name: "[]" },
	{ x: 1187, y:268, name: "[]" },
	{ x: 1184, y:333, name: "[]" },
	{ x: 1046, y:497, name: "3D" },
	{ x: 1051, y:147, name: "[]" },
	{ x: 1183, y:556, name: "4C" }
];



/*var card_data = {
	x: variable, // x position normalise to 0-1
	y: variable, // y position normalise to 0-1
	name: variable
}*/

var parseInput = function parseInput(input, st, img_width, img_height) {
	console.log(input.length);
	VisualizeInputData(input, img_width, img_height);
	var output = Array(13);
	
	for (var i=0; i<output.length; i++) { // initialize board structure
		output[i] = [];
	}
	for (var i = 0; i < input.length; i++) {
		for (var z = 0; z < input.length; z++) {
			if ( Math.abs(input[i].x - input[z].x)/img_width < deltaX/100) {
				input[z].x = input[i].x;
			}
			if ( Math.abs(input[i].y - input[z].y)/img_height < deltaY/100) {
				input[z].y = input[i].y;
			}
		}
	    }
	input.sort((a ,b) => a.y - b.y);
	input.sort((a ,b) => a.x - b.x);
	console.log(input);
	
	output[11].push(convert(input.shift()));
	
	var foundation = 1;
	while(input[0].y == output[11][0].y && foundation <= 4) {
		output[6+foundation].push(convert(input.shift()));
		foundation++;
	}
	var tableau = 0;
	var x_prev;
	while(input.length > 0 && tableau < 7) {
		x_prev = input[0].x;
		output[tableau].push(convert(input.shift()));
		if (input.length > 0) {
			if (input[0].x != x_prev) {
				tableau++;
			}
		}
	}

	if (Boolean(st.initialized) == false) {
		st.initialized = true;
		st.a = JSON.parse(JSON.stringify(output)); // deep copy object
		var sum = 0;
		while (sum < 52 - 1) {
			sum = 0;
			for (var i=0; i < st.a.length; i++) {
				sum += st.a[i].length;
			}
			st.a[11].push(new Card());
		}
		console.log(sum);
	}

	console.log(output);
	return output;
}

var convert = function convert(card_data) {
	var c = new Card;
	c.faceup = true;
	switch(card_data.name[0]) {
		case 'A': c.value = 1; break;
		case '2': c.value = 2; break;
		case '3': c.value = 3; break;
		case '4': c.value = 4; break;
		case '5': c.value = 5; break;
		case '6': c.value = 6; break;
		case '7': c.value = 7; break;
		case '8': c.value = 8; break;
		case '9': c.value = 9; break;
		case 'T': c.value = 10; break;
		case 'J': c.value = 11; break;
		case 'Q': c.value = 12; break;
		case 'K': c.value = 13; break;
		case '[': c.faceup = false; break;
		default: c.value = 0; c.faceup = false; break;
		}
	

	switch(card_data.name[1]) {
		case 'H': c.suit = 0; break;
		case 'S': c.suit = 1; break;
		case 'D': c.suit = 2; break;
		case 'C': c.suit = 3; break;
		case ']': c.faceup = false; break;
		default: c.suit = -1; c.faceup = false; break;
		}
	c.assignName();
	return c;
}

class Card {
	constructor() {
		var value;
		var suit;
		var cardName;
		var faceup = false;
		var img;
	}
	assignName() {
		this.cardName = "";
			switch(this.value) {
				case 1:
					this.cardName = this.cardName.concat("  Ace");
				break;
				case 10:
					this.cardName =this.cardName.concat("   ");
					this.cardName =this.cardName.concat(this.value);
				break;
				case 11:
					this.cardName =this.cardName.concat(" Jack");
				break;
				case 12:
					this.cardName =this.cardName.concat("Queen");
				break;
				case 13:
					this.cardName =this.cardName.concat(" King");
				break;
				default:
					this.cardName =this.cardName.concat("    ");
					this.cardName =this.cardName.concat(this.value);
				break;
			}
			
			switch(this.suit) 	{
				case 0:
					this.cardName =this.cardName.concat(" of hearts  ");
				break;
				case 1:
					this.cardName =this.cardName.concat(" of spades  ");
				break;
				case 2:
					this.cardName =this.cardName.concat(" of diamonds");
				break;
				case 3:
					this.cardName =this.cardName.concat(" of clubs   ");
				break;
				default:
				break;
			}
		// assign image link
		if (typeof this.suit === 'undefined' || typeof this.value === 'undefined') {
			this.img = "./cards/back.png";
		    } else {
			this.img = "./cards/"+this.suit+this.value+".png";
		    }
	}
}

var VisualizeInputData = function VisualizeInputData(input,img_width,img_height) {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var scalar_w = (640 / img_width);
	var scalar_h = (480 / img_height);
	for (var i=0; i < input.length; i++) {
		ctx.fillText(input[i].name, input[i].x*scalar_w, input[i].y*scalar_h);
	}
}


