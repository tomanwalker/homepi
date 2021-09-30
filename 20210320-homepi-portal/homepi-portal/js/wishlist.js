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
	var CARDS_URL = "red/trello_cards";

	$.get(CARDS_URL, function(data) {
		console.log("get_cards - data.length: " + data.length.toString());

		var b_common = list_filter(data, "Общие");
		var b_nas = list_filter(data, "Настюнька");
		var b_al = list_filter(data, "Сашке");

		//console.log("get_cards - cards.length: " + b_common.cards.length.toString());

		make_list("common", b_common);
		make_list("nastya", b_nas);
		make_list("sasha", b_al);

	}, "json");
}

function main(){
	//console.log("myjs - Started");
	get_cards();
	
	//get Trello cards
	setInterval(get_cards, 30000);
}

main();