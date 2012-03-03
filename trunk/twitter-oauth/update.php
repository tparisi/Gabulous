<html>
<head>
<title>Twitter oAuth Application by 1stwebdesigner | Update your status</title>
<link rel="stylesheet" href="style.css" type="text/css" media="screen, projection" />

<script type="text/javascript" src="http://ajax.googleapis.com/
ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function()
{
$("#tweet").keyup(function()
{
var box=$(this).val();
var main = box.length *100;
var value= (main / 140);
var count= 140 - box.length;

if(box.length <= 140)
{
$('#count').html(count);
$('#bar').animate(
{
"width": value+'%',
}, 1);
}
else
{
alert('Character Limit Exceeded!');

;
}
return false;
});

});
</script>
</head>
<body>
<h1>Hello and Welcome to the oAuth Tutorial</h1>
<?php $_SESSION['twitter_profile']; ?>
<div id="form"><!--Start form-->
<p>Twitter Handle: <?php echo $username ?></p>
<p>Profile Picture: <br /><?php echo "<img src='$profilepic' />" ?><br /></p>
<label>Update Twitter Timeline</label><br />
<form method='post' action='index.php'>

<div align="left" id="character-count"><!--Start Character Count-->
 <div id="count">140</div>
 <div id="barbox"><div id="bar"></div></div>
 </div><!--End Character Count-->
<br />
<textarea  name="tweet" cols="50" rows="5" id="tweet" ></textarea>
<br />
<input type='submit' value='Tweet' name='submit' id='submit' />
</form>
</div><!--End Form-->
</body>
</html>