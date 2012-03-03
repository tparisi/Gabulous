<?php session_start();

echo "<title>Twitter oAuth Application by 1stwebdesigner | Login to your Twitter Account</title>";

include 'lib/EpiCurl.php';
include 'lib/EpiOAuth.php';
include 'lib/EpiTwitter.php';
include 'lib/secret.php';

$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);
$oauth_token = $_GET['oauth_token'];
	if($oauth_token == '')
  	  { 
	  	$url = $twitterObj->getAuthorizationUrl();
  		echo "<div style='width:200px;margin-top:200px;margin-left:auto;margin-right:auto'>";
        echo "<a href='$url'>Sign In with Twitter</a>";
        echo "</div>";
     } 
	else
	  {
		$twitterObj->setToken($_GET['oauth_token']);
		$token = $twitterObj->getAccessToken();
		$twitterObj->setToken($token->oauth_token, $token->oauth_token_secret);	  	
		$_SESSION['ot'] = $token->oauth_token;
		$_SESSION['ots'] = $token->oauth_token_secret;
		$twitterInfo= $twitterObj->get_accountVerify_credentials();
		$twitterInfo->response;
		
		$username = $twitterInfo->screen_name;
		$profilepic = $twitterInfo->profile_image_url;

		include 'update.php';
        
     } 

if(isset($_POST['submit']))
	  {
	  	$msg = $_REQUEST['tweet'];
		
		$twitterObj->setToken($_SESSION['ot'], $_SESSION['ots']);
		$update_status = $twitterObj->post_statusesUpdate(array('status' => $msg));
		$temp = $update_status->response;
		
		echo "<div align='center'>Updated your Timeline Successfully .</div>";
		
	  }
	  echo "<div style='margin-top:100px;'>";
	  echo "<p>";
	  echo "<center>";
	  echo "<a href='http://www.1stwebdesigner.com/tutorials/how-to-update-twitter-using-php-and-twitter-api/'>Back to Tutorial</a>";
	  echo "</center>";
	  echo "</p>";
	  echo "</div>";
?> 