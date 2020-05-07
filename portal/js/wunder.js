
$("#shop_item_form").submit(function(e) {
	var POST_ITEM_URL = "red/wunder/task";

	var my_input = $("#shop_item_title").val();
	if(my_input.length === 0)
		return false;

	var my_bag = {
		list_id: 276101130,
		title: my_input
	};

	$("#shop_item_title").val("");
	
	$.ajax({
		type: "POST",
		url: POST_ITEM_URL,
		datatype : 'json',
		data: my_bag, 
		success: function(data){   
			console.log("post_shop_item - OK: " + data.toString());
		},
        error: function(xhr, resp, text) {
            console.log("wunder - Error: " + text);
        }
	});

	e.preventDefault(); // avoid to execute the actual submit of the form.
});
