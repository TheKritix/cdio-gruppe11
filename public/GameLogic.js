
//var seed = makeid(16);
//var seedDigest = [];
//import pin from "./ParseInput.js"
//console.log("Seed: "+seed);
var tmpTracker = 0;

var decklist = []; // used for initializing random deck
//var a = Array(13); // used to represent the board state
//var moves = []; // used to hold calculated valid moves
var stmp = 0; // global variable for seed digest
var hasEnforcedDrawPileRule = false;
var state = {
	initialized: false,
	a: Array(13) ,
	moves: [] ,
	moveHistory: []
}
for (var i=0; i<state.a.length; i++) { // initialize board structure
	state.a[i] = [];
}
const searchDepth = 4;
var hasInit = false;
var autoEnable = true;
// nice seed: jZ3fcxlGWwmxXtcrS4hIZ8R0apeTZ9pLDiTrcXYenV1Cuow8H2KK1vNVRrPY0Y2M
// better experiment seed: yulIf7e2jhJa3a88mnNtDjfIJUkOw4EEiCQ4VqY689hoT2JcypKdzCqAnyCsR74p
var c = Array(12);

c = [60,-65,50,-45,15,1075,90,-80,5,17,20,80]; // changed 10000 to 17

const deltaX = 3; //%
const deltaY = 3; //%
var movedCardX;
var movedCardY;
var testInput = []


testInput[0]=[
	{ x: 85, y:138, name: "KC" },
	{ x: 316, y:196, name: "JC"},
	{ x: 522, y:265, name: "2H" },
	{ x: 707, y:337, name: "QS" },
	{ x: 891, y:416, name: "7C" },
	{ x: 1046, y:497, name: "3D" },
	{ x: 1183, y:556, name: "4C" }
];
testInput[1]=[
	{ x: 85, y:138, name: "KC" },
	{ x: 316, y:196, name: "JC"},
	{ x: 522, y:265, name: "2H" },
	{ x: 707, y:337, name: "QS" },
	{ x: 891, y:416, name: "7C" },
	{ x: 1186, y:604, name: "3D" },
	{ x: 1183, y:556, name: "4C" },
	{ x: 1046, y:417, name: "TH" }
];
testInput[2]=[
	{ x: 85, y:138, name: "KC" },
	{ x: 316, y:196, name: "JC"},
	{ x: 315, y:264, name: "TH" },
	{ x: 522, y:265, name: "2H" },
	{ x: 707, y:337, name: "QS" },
	{ x: 891, y:416, name: "7C" },
	{ x: 1186, y:604, name: "3D" },
	{ x: 1183, y:556, name: "4C" },
	{ x: 1046, y:336, name: "2D" }
];

function parseRawFromModel(input) {
	var outputArray = [];
	for (var i=0; i<input.length; i++) {
		var output;
		output.x = input[i].bbox.x;
		output.y = input[i].bbox.y;
		output.width = input[i].bbox.width;
		output.height = input[i].bbox.height;
		output.name = input[i].class;
		output.conf = input[i].confidence;
		outputArray.push(output);
	}
	return outputArray;	
}

function parseInput(input, st, img_width, img_height) {
	console.log("Input length at beginning of parse:" + input.length);
	//VisualizeInputData(input, img_width, img_height);
	var output = Array(13);
	
	for (var i=0; i<output.length; i++) { // initialize board structure
		output[i] = [];
	}
	/*
	for (var i = 0; i < input.length; i++) {
		for (var z = 0; z < input.length; z++) {
			if ( Math.abs(input[i].bbox.x - input[z].bbox.x)/img_width < deltaX/100) {
				input[z].bbox.x = input[i].bbox.x;
			}
			if ( Math.abs(input[i].bbox.y - input[z].bbox.y)/img_height < deltaY/100) {
				input[z].bbox.y = input[i].bbox.y;
			}
		}
	    }*/
	input.sort((a ,b) => a.bbox.y - b.bbox.y);
	input.sort((a ,b) => a.bbox.x - b.bbox.x);
	
	/*
	var modifier = 0;
	for (var i=0; (i+modifier)<input.length; i++) {
		for (var z=0; z<i; z++) {
			if ((input[z].class === input[i].class) && i!==z) {
				input.splice(i,1);
				modifier++;
			}
		}
	}*/

	//remove duplicates
	var tmp = [];
	for (var i=0; i<input.length; i++) {
		var isUnique = true;
		for (var z=0; z<tmp.length; z++) {
			if (tmp[z].class == input[i].class) {
				isUnique = false;
			}
		}
		if (isUnique) {
			tmp.push(input[i]);
		}
	}
	input = JSON.parse(JSON.stringify(tmp)); //overwrite old input array with cleaned input array



	//console.log(input);
	
	
	if (Boolean(st.initialized) === false) {
		st.initialized = true;
		for (var i=0; i<7; i++) {
			for (var j=0; j<i; j++) {
				output[i].push(new Card());
			}
			
		}
		
		var sum = 0;
		while (sum < 52 - 1) {
			sum = 0;
			for (var i=0; i < output.length; i++) {
				sum += output[i].length;
			}
			output[11].push(new Card());
		}

		var tableau = 0;
		var x_prev;
		while(input.length > 0 && tableau < 7) {
		x_prev = input[0].bbox.x;
		output[tableau].push(convert(input.shift()));
		if (input.length > 0) {
			if (input[0].bbox.x != x_prev) {
				tableau++;
			}
		}
	}
		st.a = JSON.parse(JSON.stringify(output)); // deep copy object
	} 
	else {
		if (st.moveHistory[0].type === 1) {
			var success = false;
			for (var i=0; i < input.length; i++) {
				console.log("inputx:" + input[i].bbox.x + "  srcX:"+movedCardX+"  img_width:"+img_width);
				if  (((Math.abs((input[i].bbox.x - movedCardX)/img_width) < deltaX/100) &&
					(Math.abs(movedCardY - input[i].bbox.y - input[i].bbox.height)/img_height < deltaY/100)) 
					|| ((Math.abs((input[i].bbox.x - movedCardX + input[i].bbox.x*3)/img_width) < deltaX/100) &&
					(Math.abs(movedCardY - input[i].bbox.y + input[i].bbox.height*0.5)/img_height < deltaY/100)))		
				{
					var match = false;
					var tmp = convert(input[i]);
					for (var j=0; j<13; j++) {
						for (var z=0; z<st.a[j].length; z++) {
							if (st.a[j][z].faceup) {
								if (st.a[j][z].cardName == tmp.cardName) {
									match = true;
									console.log("match = true; " + tmp.cardName);
								}
							}
						}
					}
					if (match == false) {
						console.log(input[i].class);
						st.a[st.moveHistory[0].srcX].splice(st.moveHistory[0].srcY-1,1,convert(input[i]));
						success = true;
					}
				}
			}
			if (success == false) {
				var index1 = 0;
				var maxDistance1 = Infinity;
				for (var i=0; i < input.length; i++) {
					var tmp1 = convert(input[i]);
					if (Math.sqrt(Math.pow(input[i].bbox.x-movedCardX,2)+ Math.pow(input[i].bbox.y-movedCardY,2)) < maxDistance1) {
						var match1 = false;
						for (var j=0; j<13; j++) {
							for (var z=0; z<st.a[j].length; z++) {
								if (st.a[j][z].faceup) {
									if (st.a[j][z].cardName == tmp1.cardName) {
										match1 = true;
										console.log("match1 = true; " + tmp1.cardName);
									}
								}
							}
						}
						if (match1 == false) {
							index1 = i;
							maxDistance1 = Math.sqrt(Math.pow(input[i].bbox.x-movedCardX,2)+ Math.pow(input[i].bbox.y-movedCardY,2));
						}
					}
				}
				st.a[st.moveHistory[0].srcX].splice(st.moveHistory[0].srcY-1,1,convert(input[index1]));
			}
		} else if (st.moveHistory[0].type === 2) {
			var index = 0;
			var maxDistance = Infinity;
			for (var i=0; i<input.length; i++) {
				if (Math.sqrt(Math.pow(input[i].bbox.x,2) + Math.pow(input[i].bbox.y,2)) < maxDistance) {
					index = i;
					maxDistance = Math.sqrt(Math.pow(input[i].bbox.x,2) + Math.pow(input[i].bbox.y,2));
				}
			}
			st.a[12].splice(st.a[12].length-1,1,convert(input[index]));
		}
	}
	


	/*output[11].push(convert(input.shift()));
	
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
	}*/

	return output;
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
var convert = function convert(card_data) {
	var c = new Card;
	if (card_data.class === "10H") {
		card_data.class = "TH"
	} else if (card_data.class === "10S") {
		card_data.class = "TS"
	} else if (card_data.class === "10D") {
		card_data.class = "TD"
	} else if (card_data.class === "10C") {
		card_data.class = "TC"
	}
	c.faceup = true;
	c.originX = card_data.bbox.x;
	c.originY = card_data.bbox.y;
	switch(card_data.class[0]) {
		case 'A': case 'a': c.value = 1; break;
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
	

	switch(card_data.class[1]) {
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
		var originX;
		var originY;
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

class LegalMove {
	constructor() {
		var desc; // description of move
		var srcX; // source of card to be moved
		var srcY;
		var dst; // destination of card to be moved
		var moveUnderneath;
		//var offset; // if multiple cards are to be moved how many
		//var useOffset; // dicates whether cards below are to be moves
		var score; // AI scoring of move
		var real;
		var type; // 0 for no card unveiled, 1 for tableau card unveiled, 2 for new stock card
	}
}    
var randFromDigest = function() {
	stmp = sha256(stmp); // hash global variable
	var x = 0xBEEFCAFE; // initialize x to some number
	for (var i=0; i<stmp.length; i++) {
		x = Math.imul(x ^ stmp.charCodeAt(i), 3735928559); // use the ascii value as a power
	}
	x = Math.sin(x); // take the sine of really large number to get binary output
	//x = (x + 1) / 2;
	return x; // returns a random double between -1 and 1
}
var init = function init(st,seed) {
	hasInit = true;
	stmp = seed;
	for (var i=0; i < 52; i++) { // make 52 cards
		decklist.push(new Card()); // add them to decklist
		decklist[i].value = i%13+1 // give them value
		decklist[i].suit = Math.floor(i/13); // give them suit
		decklist[i].assignName();
	}
	//decklist = decklist.sort((a, b) => 0.5 - Math.random()); // old shuffle
	//decklist = shuffle(decklist,seed); // shuffle attempt 2
	decklist = decklist.sort((a, b) => randFromDigest(stmp)); // shuffle attempt 3
	for (var i = 0; i < 7; i++) {
		for (var z = 0; z < i+1; z++) {
			st.a[i].push(decklist.pop());
			//document.write(st.a[i][z].cardName) // see if cards look good
			if (i==z) {
				// set faceup here later
			}
		}
	}
	while(decklist.length > 0) { // add rest of deck to stock (Why didnt I fix this sooner ;_;)
		st.a[11].push(decklist.pop());
	}
}

var categorize = function categorize(n) {
	if (n <= 6) {
		return 0;
	} else if (n <= 10) {
		return 1;
	} else if (n === 11) {
		return 2;
	} else if (n === 12) {
		return 3;
	}
	return -1;
}

var evals = function evals(st) {
	//console.log("evals");
	for (var i=0; i<st.moves.length; i++) {
		var s = 0;
		var x1 = st.moves[i].srcX;
		//var y1 = (st.a[st.moves[i].srcX].length-st.moves[i].offset-1);
		var y1 = st.moves[i].srcY;
		//console.log(y1 + " " + st.moves[i].offset);
		var x2 = st.moves[i].dst;
		var y2 = st.a[st.moves[i].dst].length-1;
		/*if (st.moves[i].srcX != 11) {
			console.log(st.a[x1][y1].cardName);
		}*/
		//var debug = "";
		switch(categorize(x1)) {
			case 0: // source tableau
				switch(categorize(x2)) {
					case 0: // destination tableau
					if (y1 > 0) {
						if (Boolean(st.a[x1][y1-1].faceup) == false) {
							s += c[0];
							//debug += "0";
						} else {
							s += c[1]; // was neg
							//debug += "1";
							for (var x=0; x<10; x++) { // x is column
								if (st.a[x].length > 0) {
									if (st.a[x1][y1-1].value - 1 == st.a[x][st.a[x].length-1].value &&
										st.a[x1][y1-1].suit % 2 != st.a[x][st.a[x].length-1].suit % 2) {
											s += c[2];
											//debug += "2";
											break;
									} 
								}
								for (var y=1; y<st.a[x].length; y++) { // y is depth
									if (categorize(x) == 0) { // tableau
										if (st.a[x].length > 0) {
											if (st.a[x1][y1-1].value + 1 == st.a[x][y-1].value &&
												st.a[x1][y1-1].suit % 2 != st.a[x][y-1].suit % 2) {
													s += c[3]; // was neg
													//debug += "3";
													break;
											}
										}
									} else if (categorize(x) == 1) { // foundation
										if (st.a[x].length > 0) { 
											if (st.a[x1][y1-1].value - 1 == st.a[x][y-1].value &&
												st.a[x1][y1-1].suit == st.a[x][y-1].suit) {
													s += c[4];
													//debug += "4";
													break;	
											}
										}
									}
								}
							}
						}
					} 
					if (y1 == 0) {
						for (var x=0; x<7; x++) { // x is column
							for (var y=0; y<st.a[x].length; y++) { // y is depth
								if (Boolean(st.a[x][y].faceup) == true) {
									if (st.a[x][y].value == 13 && y > 0) { // if there is a king not in an empty slot
										var isEmpty = false;
										for (var xd=0; xd<7; xd++) { // look for an empty spot
											if (st.a[xd].length == 0) {
												isEmpty = true;
											}
										}
										if (isEmpty == false) { // if an empty spot was found dont assign points
										s += c[5];
										//debug += "5";	
										}
									}
								}
							}
						}
					}
					break;
					case 1: // destination foundation
						s += c[6];
						//debug += "6";
					break;
					default:
					break;
				}
			break;
			case 1: // source foundation
				s += c[7]; // was neg
				//debug += "7";
			break;
			case 2: // source stockpile == cycle stock
				s += c[8];
				
				if (x2 == 12) {
					// ENFORCE DRAW PILE RULE
					if (st.a[11].length+st.a[12].length == 3 && hasEnforcedDrawPileRule == false) {
						s += 100000; 
						hasEnforcedDrawPileRule = true;
					} else if ( st.a[11].length+st.a[12].length <= 3 && hasEnforcedDrawPileRule == true) {
						s += -100000;
					}
					for (var z=0; z<st.a[11].length; z++) {
						if (Boolean(st.a[11][z].faceup) == false) {
							s += c[9];
							break;
						}
					}
				}
				//debug += "8";
			break;
			case 3: // source stock
				switch(categorize(x2)) {	
					case 0: // destination tableau
						s += c[10];
						//debug += "9";
					break;
					case 1: // destination foundation
						s += c[11];
						//debug += "A";
					break;
					default:
					break;
				}
			break;
			default:
			break;
		}
		//console.log(debug);
		// recursion
		var sim = JSON.parse(JSON.stringify(st)); // deep copy object
		//if (st.moves[i].dst != 12) { // dont run for cycle stock
			var debug = "Debug:";
			st.moves[i].score = s + scoreMove(sim,i,searchDepth,debug);
		//}
	}
	var maxScore = st.moves[0].score;
	for (var i=0; i<st.moves.length; i++) {
		if (st.moves[i].real == 0) {
			if (st.moves[i].score > maxScore) {
				maxScore = st.moves[i].score;
			}
		}
	}
	st.moves[0].score = maxScore;


	function scoreMove(st, move, d, debug) {
		var s = 0;
		if (d-- > 0) {
			debug = debug+","+st.moves[move].desc;
			//console.log(st.moves[move]);
			var x1 = st.moves[move].srcX;
			//var y1 = (st.a[st.moves[move].srcX].length - st.moves[move].offset - 1);
			var y1 = st.moves[move].srcY;
			//var x2 = st.moves[move].dst;
			//var y2 = st.a[st.moves[move].dst].length-1;
			try {
			if (categorize(x1) == 0 && y1 > 0 && Boolean(st.a[x1][y1-1].faceup) == false) {
				s = (d+1)*1000;
				return s;
					
			} 
			} catch {
				console.log("x1:"+x1+" y1:"+y1);
				console.log(debug);
			}
			var sim = JSON.parse(JSON.stringify(st)); // deep copy object
			/*var sim = JSON.stringify(st); 
			var debugString = "";
			for (var i = 0; i<12; i++) {
				debugString += "st.a["+i+"].length="+st.a[i].length +" ";
			}
			var old = JSON.parse(JSON.stringify([st.moves[move].dst,st.a[st.moves[move].dst].length-1,st.moves[move].srcX,st.moves[move].srcY,st.moves[move].moveUnderneath]));

			console.log(old);
			console.log(st.moves[move]);
			*/
			executeMove(sim,move);
			
			while (sim.a[12].length > 1) {
				sim.a[11].unshift(sim.a[12][0]);
				sim.a[12].shift();
			}
		
			identifyMoves(sim);
			for (var i=0; i<sim.moves.length; i++) {
				if (sim.moves[i].dst != 12) { // avoid cycle stock in recursion
					var tmp = 0;	
					tmp = scoreMove(sim,i,d,debug); 
					if (tmp > s) {
						s = tmp;
					}
				}
			}
			/*
			for (var z = deckShift; z>0; z--) {
				for (var i=0; i<3; i++) {
					st.a[12].unshift(st.a[11][0]);
					st.a[11].shift();
				}	
			}
			//console.log(old);
			
			undoMove(st,old[0],old[1],old[2],old[3],old[4]);
			if (sim != JSON.stringify(st)) {
				console.log("ERROR");
				var sum = 0;
				for (var i = 0; i<12; i++) {
					sum += st.a[i].length;
				}
				console.log(sum);
				var debugString2 = "";
				for (var i = 0; i<12; i++) {
				debugString2 += "st.a["+i+"].length="+st.a[i].length +" ";
				}
				console.log(debug);
				console.log(debugString);
				console.log(debugString2);
			}
			*/

		return s;
		}
		return 0;
	}
}
var printGameState = function printGameState(st) {

	console.log("Start of stock print");
	for (var i = 0; i < st.a[11].length; i++) {
		console.log(st.a[11][i].name);
	}
	console.log("End of stock print");
	
	// stacks
	const elements = document.getElementById('stacks'); // clear table before rebuilding
	elements?.remove();
	const body = document.body;
const stck = document.createElement('table');
	stck.id = 'stacks';
	stck.style.width = '75px';
	//stck.style.border = '1px solid black'; // show element position for debugging
	stck.style.position = 'absolute';
	stck.style.marginBottom = '200px';
	stck.style.top = '900px';
		const trs = stck.insertRow();
		for (var i = 0; i < 2; i++) {
			const tds = trs.insertCell();
			const cs = document.createElement("img");
			cs.style.marginRight = '60px';
			if (i==0) {
			if (st.a[11].length > 0)
				cs.src = "./cards/back.png";
				else
				cs.src = "./cards/base.png";
			} else {
			if (st.a[12].length > 0)
				cs.src = st.a[12][st.a[12].length-1].img;
				else
				cs.src = "./cards/base.png";
			cs.style.marginLeft = '-60px';
			cs.style.width = '75px';
			}
			tds.appendChild(cs);
		}
		for (var i = 0; i < 4; i++) {
			const tds = trs.insertCell();
			const cs = document.createElement("img");
			if (i == 0) {
				cs.style.marginLeft = '90px';
			}
			if (st.a[7+i].length > 0) {
				cs.src = st.a[7+i][st.a[7+i].length-1].img;
			}
			else {
				cs.src = "./cards/base.png"; 
			}
			cs.style.width = '75px';
			tds.appendChild(cs);
		}
	body.appendChild(stck);
	// tableau
	const element = document.getElementById('tableau'); // clear table before rebuilding
	element?.remove();
const tbl = document.createElement('table');
	tbl.id = 'tableau';
	  tbl.style.width = '75px';
	  //tbl.style.border = '1px solid black'; // show element position for debugging
	tbl.style.position = 'absolute';
	tbl.style.marginTop = '300px';
	tbl.style.top = '900px';
	for (var y = 0; y < 21; y++) { // 21 is max height of a solitaire game
		const tr = tbl.insertRow();
		for (var x = 0; x < 7; x++) {
			const td = tr.insertCell();
			if (y < st.a[x].length) {

				if (st.a[x][y].faceup) {
				const c = document.createElement("img");
				c.src = st.a[x][y].img;
				c.style.marginTop = '-90px'; // these values should be global constants and scaled
				c.style.width = '75px';
				td.appendChild(c);
				}
				else 
				{
					const c = document.createElement("img");
					c.src = "./cards/back.png";
					c.style.marginTop = '-90px';
					c.style.width = '75px';
					td.appendChild(c);
				}
			} else {
				if (y == 0) {
					const c = document.createElement("img");
					c.src = "./cards/base.png";
					c.style.marginTop = '-90px';
					c.style.width = '75px';
					td.appendChild(c);
				}
			}
		}
	}	
	body.appendChild(tbl);
}
var faceControl = function faceControl(st) {
	// set card at the top of tableau piles to faceup
	// this is run every turn for newly revealed cards
	for (var i = 0; i < 7; i++) {
		if (st.a[i].length > 0)
		st.a[i][st.a[i].length-1].faceup = true;
	}
	for (var i = 0; i < st.a[12].length; i++) {
		st.a[12][i].faceup = true;
	}

}
var identifyMoves = function identifyMoves(st) {
	//console.log(st); // waaaayyy too much debugging :)
	st.moves = [];
	function newMove(desc, srcX, srcY, dst, moveUnderneath) {
		const m = new LegalMove;
		m.desc = desc; 
		m.srcX = srcX;
		m.srcY = srcY;
		m.dst = dst;
		m.moveUnderneath = moveUnderneath;
		m.type = 0;
		if (m.srcX == 11 && m.dst != 12) {
			m.real = 0;
		} else {
			m.real = 1;
		}
		if (srcY > 0 && categorize(srcX) === 0) {
			if (Boolean(st.a[srcX][srcY-1].faceup) == false) {
				m.type = 1;
			}
		} else if (srcX == 11 || srcX == 12) {
			m.type = 2;
		}
		st.moves.push(m);
	}
	// cycle stock
	newMove(("Cycle stock"), 11, st.a[11].length-1, 12, 0);
	// tableau to tableau
	for (var i = 0; i < 7; i++) { // i and z is card to be moved
		for (var z = 0; z < st.a[i].length; z++) {
			for (var x = 0; x < 7; x++) { // x and y is target
				// allow kings to be moved to empty piles
				try {
				if (st.a[i][z].faceup
				&& (st.a[i][z].value == 13) 
				&& (st.a[x].length == 0) 
				&& (z != 0)) {
					newMove((st.a[i][z].cardName+" to empty"), i, z, x, 1);//st.a[i].length-(z+1));	// brackets are neccesary for this string concatenation to work
				} 
				} catch {
					console.log("i:" + i + " z:" + z);
				}
				for (var y = 0; y < st.a[x].length; y++) {
					try {
					if (st.a[i][z].faceup && st.a[x][y].faceup) {
						// allow regular tableau to tableau moves
						if ( (st.a[i][z].value+1 == st.a[x][y].value)
						&&(st.a[i][z].suit%2 != st.a[x][y].suit%2) 
						&&((st.a[x][y].value == st.a[x][(st.a[x].length-1)].value) && st.a[x][y].suit == st.a[x][(st.a[x].length-1)].suit)) {
							newMove((st.a[i][z].cardName+" to "+st.a[x][y].cardName), i, z, x, 1); //st.a[i].length-(z+1));
						}
					}
					} catch {
						console.log("x:"+ x + " y:" + y);
					}
					
				}
			}
		}
	}
	// from tableau to foundation
	for (var x = 0; x < 7; x++) {
		if (st.a[x].length > 0) {
			for (var i = 0; i < 4; i++) {
				if (st.a[7+i].length == 0) {
					// if card is an ace
					if (st.a[x][st.a[x].length-1].value == 1) {
						newMove((st.a[x][st.a[x].length-1].cardName+" to foundation"), x, st.a[x].length-1, 7+i, 0);
						break;
						}
				} else {
					// if card is not an ace
					if (st.a[7+i].length+1 == st.a[x][st.a[x].length-1].value
					&&((st.a[7+i][st.a[7+i].length-1].suit == st.a[x][st.a[x].length-1].suit))) {
						newMove((st.a[x][st.a[x].length-1].cardName+" to foundation"), x, st.a[x].length-1, 7+i, 0);
					}
				}
			}
		}
	}
	// from stock to tableau
	for (var x = 0; x < 7; x++) {
		if (st.a[12].length > 0) {
		// if card is king
			if ((st.a[x].length == 0) && (st.a[12][st.a[12].length-1].value == 13) ) {
				newMove((st.a[12][st.a[12].length-1].cardName+" to empty from stock"), 12, st.a[12].length-1, x, 0);	
			}
			else if ((st.a[x].length > 0)) {
			// if card is not king
			if ( (st.a[12][st.a[12].length-1].value+1 == st.a[x][st.a[x].length-1].value)
				&&(st.a[12][st.a[12].length-1].suit%2 != st.a[x][st.a[x].length-1].suit%2) ) {
				newMove((st.a[12][st.a[12].length-1].cardName+" to "+st.a[x][st.a[x].length-1].cardName + " from stock"), 12, st.a[12].length-1, x, 0);
				}
			}	
		}
	}
	// from stock to foundation
	for (var x = 7; x < 11; x++) { 
		if ((st.a[12].length > 0) && (st.a[x].length > 0)) {
		if ( (st.a[12][st.a[12].length-1].value-1 == st.a[x][st.a[x].length-1].value)
			&&(st.a[12][st.a[12].length-1].suit == st.a[x][st.a[x].length-1].suit) ) {
			newMove((st.a[12][st.a[12].length-1].cardName+" to "+st.a[x][st.a[x].length-1].cardName + " from stock"), 12, st.a[12].length-1, x, 0);
			}
		} else {
			if (st.a[12].length > 0) {
			if (st.a[12][st.a[12].length-1].value == 1) {
				newMove((st.a[12][st.a[12].length-1].cardName+" to foundation from stock"), 12, st.a[12].length-1, x, 0);
				break;
			}
		}
		}
	}	
	// from foundation to tableau
		for (var x = 0; x < 7; x++) {
			if (st.a[x].length > 0) {
				for (var i = 0; i < 4; i++) {
					if (st.a[7+i].length > 0) {
						if ((st.a[7+i][st.a[7+i].length-1].value+1 == st.a[x][st.a[x].length-1].value)
							&& (st.a[7+i][st.a[7+i].length-1].suit%2 != st.a[x][st.a[x].length-1].suit%2)) {
							newMove((st.a[7+i][st.a[7+i].length-1].cardName+" from foundation to "+st.a[x][st.a[x].length-1].cardName), 7+i, st.a[7+i].length-1, x, 0);
						}
					}
				}
			} else {
				for (var i = 0; i < 4; i++) { 
					if (st.a[7+i].length > 0) {
						if (st.a[7+i][st.a[7+i].length-1].value == 13) {
							newMove((st.a[7+i][st.a[7+i].length-1].cardName+" from foundation to empty"), 7+i, st.a[7+i].length-1, x, 0); // king to empty spot from foundation
						}
					}	
				}	
			}
		}
	// consider all cards in stock as options
		for (var x = 0; x < 7; x++) {
			if (st.a[11].length > 0) {
				for (var y=st.a[11].length-1; y>0; y--) { // for (var y=st.a[11].length-3; y>0; y-=3)
				try {
				if (st.a[11][y].faceup) {
				// if card is king
					if ((st.a[x].length == 0) && (st.a[11][y].value == 13) ) {
						newMove((st.a[11][y].cardName+" to empty from stock"), 11, y, x, 0);	
					}
					else if ((st.a[x].length > 0)) {
					// if card is not king
					if ( (st.a[11][y].value+1 == st.a[x][st.a[x].length-1].value)
						&&(st.a[11][y].suit%2 != st.a[x][st.a[x].length-1].suit%2) ) {
						newMove((st.a[11][y].cardName+" to "+st.a[x][st.a[x].length-1].cardName + " from stock"), 11, y, x, 0);
						}
					}
				}
				} catch {
					console.log("x:"+ x + " y:" + y);
				}
			}
			}
		} 
}
/*var executeMove = function executeMove(st,x) {
	if (st.moves[x].srcX == 11 && st.a[11].length == 0) {
		for (var i=st.a[12].length-1; i >= 0; i--) {
			st.a[11].push(st.a[12][st.a[12].length-1]);
			st.a[12].pop(st.a[12].length-1);
		}
	} else {
	for (var i = 0; i <= st.moves[x].offset; i++) {
	st.a[st.moves[x].dst].push(st.a[st.moves[x].srcX][st.a[st.moves[x].srcX].length-1-(st.moves[x].offset-i)]);
	st.a[st.moves[x].srcX].splice(st.a[st.moves[x].srcX].length-1-(st.moves[x].offset-i),1);
	}
	}
}*/
var executeMove = function executeMove(st,x) {
	try {
	movedCardX = st.a[st.moves[x].srcX][st.moves[x].srcY].originX;
	movedCardY = st.a[st.moves[x].srcX][st.moves[x].srcY].originY;
	} catch(e) {
		console.log("x:" + st.moves[x].srcX + "  y:" + st.moves[x].srcY);
	}
	st.moveHistory.unshift(st.moves[x]); // Add move to history
	if (st.moves[x].srcX == 11 && st.moves[x].dst == 12) {
		if ((st.a[11].length + st.a[12].length) > 0) {
			for (var i=0; i<3; i++) {
				if (st.a[11].length > 0) {
					//console.log("11:"+st.a[11].length + " 12:" + st.a[12].length);
					st.a[12].push(st.a[11][st.a[11].length-1]);
					st.a[11].pop(st.a[11].length-1);
				} else {
					for (var z=st.a[12].length; z>0; z--) {
						st.a[11].unshift(st.a[12][0]);
						st.a[12].shift();
					}
					i--;
				}
			}
		}	
		//console.log("11:"+st.a[11].length + " 12:" + st.a[12].length);
	} /*else if (st.moves[x].srcX == 11 && st.a[11].length == 0) {
		for (var i=st.a[12].length-1; i >= 0; i--) {
			st.a[11].push(st.a[12][st.a[12].length-1]);
			st.a[12].pop(st.a[12].length-1);
		}
	}*/ else {
	var offset = 0;
	if (st.moves[x].moveUnderneath) {
		offset = (st.a[st.moves[x].srcX].length - 1) - st.moves[x].srcY;
	}
	if (st.moves[x].srcX == 11 && st.moves[x].dst != 12) {
		st.a[st.moves[x].dst].push(st.a[st.moves[x].srcX][st.moves[x].srcY]);
		st.a[st.moves[x].srcX].splice(st.moves[x].srcY,1);	
	} else {
		for (var i = 0; i <= offset; i++) {
			st.a[st.moves[x].dst].push(st.a[st.moves[x].srcX][st.a[st.moves[x].srcX].length-1-(offset-i)]);
			st.a[st.moves[x].srcX].splice(st.a[st.moves[x].srcX].length-1-(offset-i),1);
			}
		}
	}
}
/*
var undoMove = function undoMove(st,sx,sy,dx,dy,moveUnderneath) {
	// FIX INVERTED CYCLE STOCK		
	if (dx == 11 && sx == 12) {
		if ((st.a[11].length + st.a[12].length) > 0) {
			for (var i=0; i<3; i++) {
				if (st.a[11].length > 0) {
					//console.log("11:"+st.a[11].length + " 12:" + st.a[12].length);
					st.a[12].push(st.a[11][st.a[11].length-1]);
					st.a[11].pop(st.a[11].length-1);
				} else {
					for (var z=st.a[12].length; z>0; z--) {
						st.a[11].unshift(st.a[12][0]);
						st.a[12].shift();
					}
					i--;
				}
			}
		}	
		//console.log("11:"+st.a[11].length + " 12:" + st.a[12].length);
	} else {
	var offset = (st.a[sx].length - 1) - sy;
	if (moveUnderneath == 0) {
		st.a[dx].splice(dy,0,st.a[sx][sy]);
		st.a[sx].splice(sy,1);
		//alert("WTF");
	} else {
		for (var i = 0; i <= offset; i++) {
			st.a[dx].push(st.a[sx][st.a[sx].length-1-(offset-i)]);
			st.a[sx].splice(st.a[sx].length-1-(offset-i),1);
			//alert("bitch pls");
		}
	}
}
}
var undoLastMove = function undoLastMove() {
	undoMove(state,oldMove[0],oldMove[1],oldMove[2],oldMove[3],oldMove[4]);
	advanceGamestate();
}
*/
var printMoves = function printMoves(st) {
	// remove old buttons
	const elements = document.getElementById('buttons');
	elements?.remove();
	//make html table with buttons
	const body = document.body;
	const tblb = document.createElement('table');
	tblb.id = 'buttons';
	tblb.style.marginLeft = '800px' ;
	tblb.style.width = '300px';
	tblb.style.border = '1px solid black';
	tblb.style.position = 'absolute';
	for (var i=0; i<st.moves.length; i++) {
		if (1) {
			const tr = tblb.insertRow();
			const td = tr.insertCell();
			const x = i;			
			var btn = document.createElement("button");
			btn.innerHTML = (st.moves[x].desc +" Score: "+st.moves[x].score+" isReal:"+st.moves[x].real);
			//btn.innerHTML = (st.moves[x].desc);
			//console.log(st.moves[x].srcX+" "+st.moves[x].dst+" "+(st.a[st.moves[x].srcX].length - st.moves[x].offset - 1));
			btn.id='button_'+x;
			btn.onclick = function () {
				//console.log(st);
				//console.log(st.moves[x]);
				//oldMove = [st.moves[x].dst,st.a[st.moves[x].dst].length,st.moves[x].srcX,st.moves[x].srcY,st.moves[x].moveUnderneath];
				executeMove(st,x);
				if (advanceGamestate()) {
					alert("WIN");
				}
			};
			td.appendChild(btn);
		}
	}
	body.appendChild(tblb);
}
var checkIfWin = function checkIfWin(st) {
		if ((st.a[7].length == 13) && (st.a[8].length == 13)
		&& (st.a[9].length == 13) && (st.a[10].length == 13)) {
			return true;
		}
		return false;
}
var sortMoves = function sortMoves(st) {
	st.moves.sort((a, b) => b.score-a.score);
	console.log(st.moves[0]);
}

function advanceGS(model, screen_width, screen_height) {
	parseInput(model, state, screen_width, screen_height);
	console.log(state);
	printGameState(state);
	identifyMoves(state);
	evals(state);
	sortMoves(state);
	executeMove(state,0);
	console.log(state.a);
	return;
}
var advanceGamestate = function advanceGamestate() {
	parseInput(testInput[0], state, 1280, 720);
	faceControl(state);
	printGameState(state);
	identifyMoves(state);
	evals(state);
	sortMoves(state);
	printMoves(state);
	//executeMove(state,0);
	return checkIfWin(state);
}
var advanceGamestateAuto = function advanceGamestateAuto() {
	faceControl(state);
	//printGameState(state);
	identifyMoves(state);  // hypothetical should be set to false here
	evals(state);
	sortMoves(state);
	//printMoves(state);
	executeMove(state,0);
	return checkIfWin(state);
}
var initialize = function initialize() {
	//randomizeC();
	var input = document.getElementById("seedInput").value;
	if (input == "") {
		input = makeSeed(64);
	}
	console.log("Seed: "+input);
	document.getElementById("seedDisplay").innerHTML = "Seed: "+input;
	//init(state,input);
	advanceGamestate();
}
var autoSolveTurns = 120;
function updateAutoButton() {
	autoSolveTurns = document.getElementById("autoInput").value;
	document.getElementById("autoButton").innerHTML = "Auto execute "+autoSolveTurns+" moves";
}
var autoSolve = async function autoSolve() {
		if (hasInit) {
			const ms = 75;
			for (var i=0; i < autoSolveTurns; i++) {
					document.getElementById("autoCounter").innerHTML = (autoSolveTurns - i);
						await delay(ms);
						executeMove(state,0);
						if (advanceGamestate()) {
							break;
						}
			}
			document.getElementById("autoCounter").innerHTML = "";
		} else {
			alert("Initialize game first");
		}
}
function delay(ms){
    return new Promise(function(resolve){
        setTimeout(resolve,ms);
    });
}

var initializeAuto = async function initializeAuto() {
	autoEnable = true;
	var runs = 100;
		var tmp = Array(11);
		var wins= 0;
		for (var i=0;i<tmp.length;i++) {
			tmp[i] = 0;	
		}
		
		//randomizeC();
		for (var n=0; n<runs; n++) {
			if (autoEnable == false) {
				console.log("Break");
				break;
			}
		console.log("Run: "+(n+1));
		var input = document.getElementById("seedInput").value;
		if (input == "") {
			input = makeSeed(64);
		}
		//console.log("Seed: "+input);
		document.getElementById("seedDisplay").innerHTML = "Seed: "+input;
		init(state,input);
			for (var i=0; i<150; i++) {
				if (advanceGamestateAuto()) {
					wins++;
					console.log("Win");
					break;
				}
			}
		}
		console.log(" Wins: "+wins+"/"+runs+" c: "+c);
	}


	

var sha256 = function sha256(ascii) { // from https://gist.github.com/bryanchow/1649353
		function rightRotate(value, amount) {
			return (value>>>amount) | (value<<(32 - amount));
		};
		
		var mathPow = Math.pow;
		var maxWord = mathPow(2, 32);
		var lengthProperty = 'length'
		var i, j; // Used as a counter across the whole file
		var s = ''
	
		var words = [];
		var asciiBitLength = ascii[lengthProperty]*8;
		
		//* caching results is optional - remove/add slash from front of this line to toggle
		// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
		// (we actually calculate the first 64, but extra values are just ignored)
		var hash = sha256.h = sha256.h || [];
		// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
		var k = sha256.k = sha256.k || [];
		var primeCounter = k[lengthProperty];
		/*/
		var hash = [], k = [];
		var primeCounter = 0;
		//*/
	
		var isComposite = {};
		for (var candidate = 2; primeCounter < 64; candidate++) {
			if (!isComposite[candidate]) {
				for (i = 0; i < 313; i += candidate) {
					isComposite[i] = candidate;
				}
				hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
				k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
			}
		}
		
		ascii += '\x80' // Append Ƈ' bit (plus zero padding)
		while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
		for (i = 0; i < ascii[lengthProperty]; i++) {
			j = ascii.charCodeAt(i);
			if (j>>8) return; // ASCII check: only accept characters in range 0-255
			words[i>>2] |= j << ((3 - i)%4)*8;
		}
		words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
		words[words[lengthProperty]] = (asciiBitLength)
		
		// process each chunk
		for (j = 0; j < words[lengthProperty];) {
			var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
			var oldHash = hash;
			// This is now the undefinedworking hash", often labelled as variables a...g
			// (we have to truncate as well, otherwise extra entries at the end accumulate
			hash = hash.slice(0, 8);
			
			for (i = 0; i < 64; i++) {
				var i2 = i + j;
				// Expand the message into 64 words
				// Used below if 
				var w15 = w[i - 15], w2 = w[i - 2];
	
				// Iterate
				var a = hash[0], e = hash[4];
				var temp1 = hash[7]
					+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
					+ ((e&hash[5])^((~e)&hash[6])) // ch
					+ k[i]
					// Expand the message schedule if needed
					+ (w[i] = (i < 16) ? w[i] : (
							w[i - 16]
							+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
							+ w[i - 7]
							+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
						)|0
					);
				// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
				var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
					+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
				
				hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
				hash[4] = (hash[4] + temp1)|0;
			}
			
			for (i = 0; i < 8; i++) {
				hash[i] = (hash[i] + oldHash[i])|0;
			}
		}
		
		for (i = 0; i < 8; i++) {
			for (j = 3; j + 1; j--) {
				var b = (hash[i]>>(j*8))&255;
				s += ((b < 16) ? 0 : '') + b.toString(16);
			}
		}
		return s;
	};
var makeSeed = function makeSeed(length) {
	var output = '';
	var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // allow any character
	var cLength = c.length;
	for ( var i = 0; i < length; i++ ) {
		output += c.charAt(Math.floor(Math.random() * cLength)); // pick a random char from the string c to add the seed
	}
	return output;
}
