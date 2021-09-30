
// ## config


// ## func
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
	
	var CPU_TEMP_MAX = 70;
	var PI_STATUS_URL = "http://192.168.1.2:1880/api/status";
	
	//console.log("myjs.get_pi_status - start...");
	
	var callbackGood = function(data){
		console.log("myjs.get_pi_status - data: %j", data);
		
		/*
		{
			rows:[{
				"id": "kodi",
				"cputemp":45.5,"time":"2019-11-07T12:59:06.054Z",
				"ramtotal":830568,"ramused":1681404,"ramfree":0,
				"sd":{"total":"14607","used":"11838","p":"86%","path":"/"}
			}]
		}
		*/
		['kodi', 'hub'].forEach(function(x){
			
			var obj = data.rows.find(z => z.id === x);
			
			// CPU-temp
			var target = "#pi_temp_" + x;
			$(target).text( obj.cputemp.toString() + " C" );
			var isMaxTemp = obj.cputemp >= (CPU_TEMP_MAX * 90 / 100);
			var temp_p = 0;
			
			if(isMaxTemp){
				temp_p = CPU_TEMP_MAX;
				$(target).addClass("progress-bar-danger");
			} else {
				temp_p = Math.round(100 * obj.cputemp / CPU_TEMP_MAX);
				$(target).removeClass("progress-bar-danger");
			}
			
			$(target).css({ width: (temp_p.toString() + "%") });
			
			// RAM
			target = "#pi_ram_" + x;
			
			var ram_text = Math.round(obj.ram.used / 1024).toString();
			$(target).text(ram_text + " MB");
			$(target).css({ width: (obj.ram.p) });
			
			// HD
			if( obj.hd ){
				var hd_used_target = "#hd_space_used_" + x;
				var hd_free_target = "#hd_space_free_" + x;
				var hd_p_used = parseFloat(obj.hd.p);
				var hd_p_free = 100 - hd_p_used;
				var isLowSpace = hd_p_free < 10;
				
				var hd_used = parseFloat(obj.hd.used);
				var hd_free = parseFloat(obj.hd.total) - hd_used;
				var hd_mod = (hd_used / 1024) > 3;
				var hd_text = hd_mod ? (roundToTwo(hd_free / 1024)).toString() + " GB" : hd_free.toString() + " MB";
				
				var hd_text_target = (hd_p_used > hd_p_free) ? hd_used_target : hd_free_target;
				$(hd_text_target).text(hd_text);
				$(hd_used_target).css({ width: (hd_p_used.toString() + "%") });
				$(hd_free_target).css({ width: (hd_p_free.toString() + "%") });
				
				if(isLowSpace){
					$(hd_used_target).addClass("progress-bar-danger");
				} else {
					$(hd_used_target).removeClass("progress-bar-danger");
				}
			}
			
			// SD
			if( obj.sd ){
				target = "#sd_space_" + x;
				var sd_p_used = parseFloat(obj.sd.p);
				$(target).css({ width: obj.sd.p });
				$(target).text("SD = " + obj.sd.p);
			}
		});
		
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
	
	//get_shop_list();
	
	//get pi status
	setInterval(get_pi_status, 5000);
	
	//get shop list
	var shop_interval = 20 * 60 * 1000; // once per 20 mins
	//setInterval(get_shop_list, shop_interval);
}

main();
