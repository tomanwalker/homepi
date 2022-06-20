
// ## config


// ## func
function roundToTwo(num) {
	return +(Math.round(num + "e+2")  + "e-2");
}

function get_pi_status(){
	
	var CPU_TEMP_MAX = 80;
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
		['hub'].forEach(function(x){
			
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
			if( obj.ext_1 ){
				var hd_used_target = "#hd_space_used_" + x;
				var hd_free_target = "#hd_space_free_" + x;
				var hd_p_used = parseFloat(obj.ext_1.p);
				var hd_p_free = 100 - hd_p_used;
				var isLowSpace = hd_p_free < 10;
				
				var hd_used = parseFloat(obj.ext_1.used);
				var hd_total = parseFloat(obj.ext_1.total);
				var hd_free = hd_total - hd_used;
				
				var hd_mod = (hd_used / 1024) > 2;
				//console.log('DEBUG = ', hd_mod);
				var hd_text = obj.ext_1.kind + ' = ';
				hd_text += hd_mod ? (roundToTwo(hd_used / 1024)).toString() + " GB" : hd_used.toString() + " MB";
				
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
				
				var sd_used = parseFloat(obj.sd.used);
				var sd_p_used = parseFloat(obj.sd.p);
				var sd_suff = "MB";
				if( sd_used > 1024 ){
					sd_used = Math.floor(sd_used / 1024);
					sd_suff = "GB";
				}
				var sd_text = sd_used + ' ' + sd_suff;
				
				$(target).css({ width: obj.sd.p });
				$(target).text("SD = " + sd_text);
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

function get_indoor(){
	
	var ROOM_TEMP_MAX = 40;
	var ROOM_TEMP_MIN = 0;
	var PI_TEMP_URL = "http://192.168.1.2:1880/api/temp";
	var elem = $('#panelBodyIndoor pre');
	
	var callbackGood = function(result){
		
		var oneRoom = result.rows[0];
		
		var tempRatio = Math.round(oneRoom.cal / (ROOM_TEMP_MAX - ROOM_TEMP_MIN) * 100);
		$('#indoor_temp').text( oneRoom.cal + " C");
		$('#indoor_temp').css({ width: (tempRatio + '%') });
		
		var humRatio = Math.round(oneRoom.humidity);
		$('#indoor_hum').text( oneRoom.humidity );
		$('#indoor_hum').css({ width: (humRatio + '%') });
		
		///// ------
		oneRoom.temperature = oneRoom.cal;
		delete oneRoom.cal;
		
		var fmtText = '';
		Object.keys(oneRoom).forEach(function(p){
			fmtText += `${p} = ${oneRoom[p]}`;
			fmtText += "\n";
		});
		
		elem.html(fmtText);
	};
	
	$.ajax({
		type: 'GET',
		url: PI_TEMP_URL,
		dataType: 'json',
		success: callbackGood,
		error: function(err) {
			console.log("myjs.get_indoor - err: " + JSON.stringify(err));
		}
	});
	
};

function main(){
	//console.log("myjs - Started");
	get_pi_status();
	get_indoor();
	
	setInterval(get_pi_status, 5000);
	setInterval(get_indoor, 5000);
	
	//get shop list
	//get_shop_list();
	//var shop_interval = 20 * 60 * 1000; // once per 20 mins
	//setInterval(get_shop_list, shop_interval);
}

main();
