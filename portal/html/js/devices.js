

var get_devices = async function(){
	
	//console.log('get_devices - start...');
	var data = await getPromise(SVC.hub + "/api/sys");
	//console.log('get_devices - result = %j', data);
	
	//$('#test').html(JSON.stringify(data, null, 2));
	$('#sys-tbody').html('');
	
	data.rows.forEach(function(s){
		var row = trow(s.id, s.update, s.os, s.ts);
		$('#sys-tbody').append(row);
	});
	
};

run_loop(get_devices, 5000);


