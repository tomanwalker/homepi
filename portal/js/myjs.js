
function roundToTwo(num) {
	return +(Math.round(num + "e+2")  + "e-2");
}

function get_shop_list(){
	var SHOP_LIST_URL = "red/shop_list";
	
	$.get(SHOP_LIST_URL, function(data) {
		console.log("get_shop_list - data.length: " + data.length.toString());
		
		$("#shop_list").empty();
		
		if(data.length === 0){
			$("#shop_list").append('<li class="list-group-item">' + "__________" + "</li>\n");
		}
		
		for(var z in data){
			$("#shop_list").append('<li class="list-group-item">' + data[z].title + "</li>\n");
		}
		
	}, "json");
}

function get_pi_status(){
	
	var CPU_TEMP_MAX = 80;
	//http://192.168.1.3/
	var PI_STATUS_URL = "red/getstatus";
	
	console.log("myjs.get_pi_status - start...");
	
	var callbackGood = function(data){
		console.log("myjs.get_pi_status - data: " + JSON.stringify(data));
		
		/*
		{
		  "cputemp":45.5,"time":"2019-11-07T12:59:06.054Z",
		  "ramtotal":830568,"ramused":1681404,"ramfree":0,
		  "sd":{"total":"14607","used":"11838","p":"86%","path":"/"}
		}
		*/
		
		//CPU-temp
		$("#pi_temp").text( data.cputemp.toString() + " C" );
		var isMaxTemp = data.cputemp >= (CPU_TEMP_MAX * 90 / 100);
		var temp_p = 0;
		
		if(isMaxTemp){
			temp_p = CPU_TEMP_MAX;
			$("#pi_temp").addClass("progress-bar-danger");
		} else {
			temp_p = Math.round(100 * data.cputemp / CPU_TEMP_MAX);
			$("#pi_temp").removeClass("progress-bar-danger");
		}
		$("#pi_temp").css({ width: (temp_p.toString() + "%") });
		
		
		// RAM
		var ram_text = Math.round(data.ramused / 1024).toString();
		$("#pi_ram").text(ram_text + " MB");
		var ram_p = Math.round(100 * data.ramused / data.ramtotal);
		$("#pi_ram").css({ width: (ram_p.toString() + "%") });
		
		// HD
		if( data.hd ){
			var hd_p_used = parseFloat(data.hd.p);
			var hd_p_free = 100 - hd_p_used;
			var isLowSpace = hd_p_free < 10;
			
			var hd_used = parseFloat(data.hd.used);
			var hd_free = parseFloat(data.hd.total) - hd_used;
			var hd_mod = (hd_used / 1024) > 3;
			var hd_text = hd_mod ? (roundToTwo(hd_free / 1024)).toString() + " GB" : hd_free.toString() + " MB";
			
			var hd_text_target = (hd_p_used > hd_p_free) ? "#hd_space_used" : "#hd_space_free";
			$(hd_text_target).text(hd_text);
			$("#hd_space_used").css({ width: (hd_p_used.toString() + "%") });
			$("#hd_space_free").css({ width: (hd_p_free.toString() + "%") });
			
			if(isLowSpace){
				$("#hd_space_used").addClass("progress-bar-danger");
			} else {
				$("#hd_space_used").removeClass("progress-bar-danger");
			}
		}
		
		if( data.sd ){
			var sd_p_used = parseFloat(data.sd.p);
			$( "#sd_space" ).css({ width: data.sd.p });
			$( "#sd_space" ).text("SD = " + data.sd.p);
		}
		
	};
	
	$.ajax({
		type: 'GET',
		url: PI_STATUS_URL,
		dataType: 'json',
		success: callbackGood,
		error: function(err) {
			console.log("myjs.get_pi_status - err: " + JSON.stringify(err));
		}
	});
	
}

function main(){
	//console.log("myjs - Started");
	get_pi_status();
	
	get_shop_list();
	
	//get pi status
	setInterval(get_pi_status, 5000);
	
	//get shop list
	var shop_interval = 20 * 60 * 1000; // once per 20 mins
	setInterval(get_shop_list, shop_interval);
}

main();
