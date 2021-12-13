
$("#bot_form").submit(function(e) {
	var POST_ITEM_URL = "http://192.168.1.3:1880/api/bot";
	var BOX_INPUT = "#bot_input";

	var my_input = $(BOX_INPUT).val();
	if(my_input.length === 0)
		return false;

	var my_bag = {
		cmd: my_input
	};

	$(BOX_INPUT).val("");
	
	$.ajax({
		type: "POST",
		url: POST_ITEM_URL,
		datatype : 'json',
		data: my_bag, 
		success: function(data){   
			console.log("bot - OK: %j", data);
			var toprint = data.result;
			if( typeof(toprint) !== 'string' ){
				toprint = JSON.stringify(toprint, null, 2);
			}
			$("#bot_output").html(toprint);
		},
        	error: function(xhr, resp, text) {
            		console.log("bot - Error: " + text);
        	}
	});

	e.preventDefault(); // avoid to execute the actual submit of the form.
	return false;
});
