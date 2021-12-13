

var deviceStatusDrop = (
	'<li>'
		+ '<a href="javascript:;" data-toggle="collapse" data-target="#ul_mon">'
		+ '<i class="fa fa-fw fa-bar-chart-o"></i> Monitoring '
		+ '<i class="fa fa-fw fa-caret-down"></i>'
		+ '</a>'
		+ '<ul id="ul_mon" class="collapse">'
			+ '<li><a href="logs.html">Logs</a></li>'
			+ '<li><a href="devices.html">Devices</a></li>'
		+ '</ul>'
	+ '</li>'
);

var menuList = [
	'<li><a href="trailers.html"><i class="fa fa-fw fa-desktop"></i> Trailers </a></li>',
	deviceStatusDrop
];

var setActive = function(){
	
	var url = window.location.pathname.replace('/', '');
	console.log('menu - url = %s', url);
	
	var el_a = $('a[href="' + url + '"]');
	//console.log('menu - DEBUG 1 = %s', el_a.html());
	var el_li = el_a.parent();
	//console.log('menu - DEBUG 2 = %s', el_li.html());
	
	el_li.addClass('active');
	
	var el_ul = el_li.parent();
	var el_ul_id = el_ul.attr('id');
	var el_is_top = ( el_ul_id === 'menu-ul' );
	console.log('menu - mid - parent_id = %s | istop = %s', el_ul_id, el_is_top);
	
	if( !el_is_top ){
		var el_dropdown = el_ul.parent();
		el_dropdown.addClass('active');
	}
	
};

$( document ).ready(function(){
	
	console.log('menu - start - len = %s', menuList.length);
	
	for(var mi of menuList){
		$("#menu-ul").append( mi );
	}
	
	setActive();
	
});


