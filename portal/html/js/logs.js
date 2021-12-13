

function get_logs(){
	
	var LOGS_URL = "http://192.168.1.3:1880/api/logs?_limit=40";
	
	//console.log("get_logs - Start...");
	
	$.ajax({
		type: 'GET',
		url: LOGS_URL,
		success: function(data){
			//console.log("get_logs - data.length: " + data.length.toString());
			
			$('#logs').html(data);
			
		},
		error: function(err) {
			console.log("get_logs - err: " + JSON.stringify(err));
		}
	});
}

function run_logs(){
	console.log("run_logs - Started...");
	get_logs();
	
	setInterval(get_logs, 5000);
}

run_logs();


