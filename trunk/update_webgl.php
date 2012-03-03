<html>
<head>
<title>Welcome to Gabulous</title>
<link rel="stylesheet" href="style.css" type="text/css" media="screen, projection" />
<link rel="stylesheet" href="css/sb.css" /> 

<script src="./gabulous.js"></script>
<script src="libs/jquery-1.6.4.js"></script>
    <script src="libs/jquery.mousewheel.js"></script>
<script src="libs/RequestAnimationFrame.js"></script>
<script src="libs/Three.js"></script>
<script src="libs/sb.js"></script>
<script src="./gabscape.js"></script>
<script src="./gabber.js"></script>
<script src="./gabatar.js"></script>
<script>
<?php 
echo("var twitter_user_name = '$username';\n"); 
echo("var twitter_screen_name = '$screen_name';\n"); 
echo("var twitter_profile_pic = '$profilepic';\n"); 
echo("var twitter_user_id = '$userid';\n"); 
?>
var gabscape = null;
$(document).ready(
	function() {
		var container = document.getElementById("container");
		
		gabscape = new Gabscape;
		var info = { user_name : twitter_user_name,
				screen_name : twitter_screen_name,
				profile_pic : twitter_profile_pic,
				user_id : twitter_user_id
		};
		
		gabscape.initialize ( { container : container, info : info  } );
		gabscape.run();
	}
);

</script>

</head>
<body>
<?php $_SESSION['twitter_profile']; ?>
<div id="container" style="width:95%; height:80%; position:absolute;"></div>
<div id="form" style="width:95%; height:20%; position:absolute; top:80%"><!--Start form-->
<?php echo "<img src='$profilepic' />" ?> <b><?php echo $username; ?></b>  @<?php echo $screen_name; ?>
<!-- 
<p>Twitter ID: <?php echo $userid; ?></p>
 -->
<label>Update Twitter Timeline</label><br />
<form method='post' action='index.php'>
<textarea  name="tweet" cols="100" rows="3" id="tweet" ></textarea>
<br />
<input type='submit' value='Tweet' name='submit' id='submit' />
</form>
</div><!--End Form-->
<!-- 
<div  id="status" style="overflow:hidden; position:absolute; border:solid; border-width:1; left: 16px; top: 360px; width:800px;"><label id="statusLabel">Status: </label></div>
<div  id="friends" style="overflow:hidden; position:absolute; border:solid; border-width:1; left: 816px; top: 360px; width:800px;"><label id="friendsLabel">Friends: </label></div>
<div  id="public" style="overflow:hidden; position:absolute; border:solid; border-width:1; left: 816px; top: 40px; width:800px; height:320px;"><label id="friendsLabel">Public Timeline: </label></div>
 -->

</body>
</html>
