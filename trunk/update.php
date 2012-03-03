<html>
<head>
<title>Welcome to Gabulous</title>
<link rel="stylesheet" href="style.css" type="text/css" media="screen, projection" />

<script src="./gabulous.js"></script>
<script src="libs/jquery-1.6.4.js"></script>
<script>
<?php echo("var twitter_screen_name = '$screen_name';\n"); ?>
$(document).ready(
	function() {
		Gabulous.getTimeline(timelineCallback);
	}
);

function updateStatus(message)
{
	document.getElementById("status").innerHTML = message;
}

function timelineCallback(result, responseText)
{
	var foo = result;
	var statusInfo = getStatusInfo(result);
    updateStatus(statusInfo);
	Gabulous.getFriends(twitter_screen_name, friendsCallback);
}

function getStatusInfo(status)
{
	var info = "";
	var i, len = status.length;
	for (i = 0; i < len; i++)
	{
		var stat = status[i];
		
		info += (
	"<img src='" + stat.user.profile_image_url + "'>" +
	"<b>" + stat.user.name +"</b>" + " @" + stat.user.screen_name + "<br/>" + stat.text + "<br/>"
			);
	}	

	return info;
}

function updateFriends(message)
{
	document.getElementById("friends").innerHTML = message;
}

function friendsCallback(result, responseText)
{
	var foo = result;
	var friendsInfo = getFriendsInfo(result);
	
	updateFriends(friendsInfo);

	Gabulous.getPublicTimeline(publicTimelineCallback);
}

function getFriendsInfo(friends)
{
	var info = "";
	var i, len = friends.length;
	for (i = 0; i < len; i++)
	{
		var friend = friends[i][0];
		
		info += (
	"<img src='" + friend.profile_image_url + "'>" +
	"<b>" + friend.name +"</b>" + " @" + friend.screen_name + "<br/>" + friend.status.text + "<br/>"
			);
	}	

	return info;
}

function updatePublicTimeline(message)
{
	document.getElementById("public").innerHTML = message;
}

function publicTimelineCallback(result, responseText)
{
	var foo = result;
	var statusInfo = getStatusInfo(result);
    updatePublicTimeline(statusInfo);
}

</script>

</head>
<body>
<h1>Welcome to Gabulous</h1>
<?php $_SESSION['twitter_profile']; ?>
<div id="form"><!--Start form-->
<?php echo "<img src='$profilepic' />" ?> <b><?php echo $username; ?></b>  @<?php echo $screen_name; ?>
<!-- 
<p>Twitter ID: <?php echo $userid; ?></p>
 -->
<p></p></bp><label>Update Twitter Timeline</label><br />
<form method='post' action='index.php'>

<br />
<textarea  name="tweet" cols="50" rows="5" id="tweet" ></textarea>
<br />
<input type='submit' value='Tweet' name='submit' id='submit' />
</form>
</div><!--End Form-->
<div  id="status" style="overflow:hidden; position:absolute; border:solid; border-width:1; left: 16px; top: 360px; width:800px;"><label id="statusLabel">Status: </label></div>
<div  id="friends" style="overflow:hidden; position:absolute; border:solid; border-width:1; left: 816px; top: 360px; width:800px;"><label id="friendsLabel">Friends: </label></div>
<div  id="public" style="overflow:hidden; position:absolute; border:solid; border-width:1; left: 816px; top: 40px; width:800px; height:320px;"><label id="friendsLabel">Public Timeline: </label></div>

</body>
</html>
