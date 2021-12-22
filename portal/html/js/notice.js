
var Global_Notice_List = [];

function get_notice(limit){
	
	var NOTICE_URL = "http://192.168.1.3:1880/notice?limit=" + limit;
	
	/* 
	 * TODO IF isFirstCall
	 * THEN Browser Notify API 
	 */
	
	$.get(NOTICE_URL, function(data) {
		//console.log("get_notice - data: " + JSON.stringify(data));
		
		$("#notice_holder").empty(); // Clean notes
		
		if(data.length > 0){
			//Compare if New came
			var isChanged = (Global_Notice_List.length > 0) ? (Global_Notice_List[0].time !== data[0].time) : true;
			/*
			console.log("get_notice - global.length: " + Global_Notice_List.length.toString());
			console.log("get_notice - isChanged: " + isChanged.toString());
			if(Global_Notice_List[0]){
				console.log("get_notice - old.time: " + Global_Notice_List[0].time);
				console.log("get_notice - new.time: " + data[0].time);
			}
			*/
			// TODO Improve IsChanged E.g. First entry removed, but no real NEW entries, thus 
			// Check to be for all Data check if not yet present in Global (array.some?)

			if(isChanged){
				//$("#alert_bell").css({ color: '#EC6161' });
				console.log("get_notice - isChanged: " + isChanged.toString());
			}
			
			Global_Notice_List = data;
			//Populate holder
			for(var n in data){
				$("#notice_holder").append('<li data-id="' + data[n].id + '"><a href="#">' + data[n].msg + '</a></li>');
			}
			
			//$("#notice_holder").append('<li class="divider"></li>');
			// TODO Append at the end <li><a href="#">View All</a></li>
			
			/* 
			 * TODO IF Notify API permission Granted
			 * THEN PUSH First Notification only
			 */
		} else {
			$("#alert_bell").css({ color: '' });
		}
	}, "json");
}	

function notice_ack(id){
	console.log("notice - ACK: " + id);
	// TODO Implement notice Removal request
}

function bell_click(){
	console.log("notice - Bell click: " + id);
	
	// TODO Implement notice Removal request
}

function run_notice(){
	var NAV_MAX = "5";
	var NOTICE_INTERVAL = 10000;
	console.log("notice - Started");
	
	get_notice(NAV_MAX);
	
	setInterval(function(){get_notice(NAV_MAX);}, NOTICE_INTERVAL);
}

run_notice();
