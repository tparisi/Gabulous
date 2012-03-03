function parseResponse(xmlhttp, callback)
{
    if (xmlhttp.readyState == 4)
    {
        if (xmlhttp.status == 200)
        {
            var result = eval('(' + xmlhttp.responseText + ')');
            callback(result, xmlhttp.responseText)
            return result;
        }
        else if (xmlhttp.status == 404)
        {
        	callback(null, "Status: 404");
        }
    }

    return null;
}

var Gabulous = {};

Gabulous.getTimeline = function(callback)
{
	var response;

	// updateStatus("Fetching timeline...");
	
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () { response = parseResponse(xmlhttp, callback);} ;

    var queryurl = '/Gabulous/timeline.php';
    xmlhttp.open('GET', queryurl, true);
    xmlhttp.send(null);
}

Gabulous.getFriends = function(screen_name, callback)
{
	var response;

	// updateFriends("Fetching friends...");
	
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () { response = parseResponse(xmlhttp, callback);} ;

    var queryurl = '/Gabulous/friends.php?screen_name=' + screen_name;
    xmlhttp.open('GET', queryurl, true);
    xmlhttp.send(null);
}


Gabulous.getUsersInfo = function(ids, callback)
{
	var response;

	// updateFriends("Fetching friends...");
	
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () { response = parseResponse(xmlhttp, callback);} ;

    var queryurl = '/Gabulous/users_info.php?user_id=' + ids[0];
    xmlhttp.open('GET', queryurl, true);
    xmlhttp.send(null);
}

Gabulous.getPublicTimeline = function(callback)
{
	var response;

	// updatePublicTimeline("Fetching public timeline...");
	
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () { response = parseResponse(xmlhttp, callback);} ;

    var queryurl = '/Gabulous/public_timeline.php';
    xmlhttp.open('GET', queryurl, true);
    xmlhttp.send(null);
}