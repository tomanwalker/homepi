
// ## conf
var CARDS_URL = "http://192.168.1.2:1880/api/db/portal/trello_cards";

// ## fund
function list_filter(arr, l_name){
	return arr.filter(function(el){
		return el.name === l_name;
	})[0];
}

function make_list(id, arg_list){
	$("#list_" + id).empty();
	
	$("#list_header_" + id).text(arg_list.name);
	var my_cards = arg_list.cards;
	
	console.log("make_list - list.name: " + arg_list.name);
	console.log("make_list - cards.length: " + my_cards.length.toString());
	for(var z in my_cards){
		$("#list_" + id).append('<li class="list-group-item">' + my_cards[z].name + "</li>\n");
	}
}

function get_cards(){
	
	$.get(CARDS_URL, function(data) {
		console.log("get_cards - data.length: " + data.length.toString());
		
		["NEXT", "INPROG", "COMPLETED"].forEach(function(x){
			
			var col = list_filter(data, x);
			make_list(x, col);
			
		});
		
	}, "json");
}

function main(){
	//console.log("myjs - Started");
	get_cards();
	
	//get Trello cards
	setInterval(get_cards, 20000);
}

// ## flow
main();


