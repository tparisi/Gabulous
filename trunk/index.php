<?php

session_start();

include 'lib/EpiCurl.php';
include 'lib/EpiOAuth.php';
include 'lib/EpiTwitter.php';
include 'lib/secret.php';

$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);
$oauth_token = isset($_GET['oauth_token']) ? $_GET['oauth_token'] : null ;

//error_log("----- DEBUGGING ---- oauth_token: " . $oauth_token);
//print_r($_SESSION);

 if ($_SESSION['ot'] && $_SESSION['ots'])
 {
 	$ot = $_SESSION['ot'];
 	$ots = $_SESSION['ots'];
	$twitterObj->setToken($ot, $ots);
    $twitterInfo= $twitterObj->get_accountVerify_credentials();
    $twitterInfo->response;

 	$screen_name = $twitterInfo->screen_name;
 	$username = $twitterInfo->name;
    $userid = $twitterInfo->id;
    $profilepic = $twitterInfo->profile_image_url;

    include 'update_webgl.php';
 }
 else if($oauth_token == '')
 {
 $url = $twitterObj->getAuthorizationUrl();
 echo "<h1>Welcome to Gabulous</h1>";
 echo "<a href='$url'><img src='./images/lighter.png' alt='Sign in with Twitter'/></a>";
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

 $screen_name = $twitterInfo->screen_name;
 $username = $twitterInfo->name;
 $userid = $twitterInfo->id;
 $profilepic = $twitterInfo->profile_image_url;

 include 'update_webgl.php';

 }

if(isset($_POST['submit']))
 {
 $msg = $_REQUEST['tweet'];

 $twitterObj->setToken($_SESSION['ot'], $_SESSION['ots']);

  $update_status = $twitterObj->post_statusesUpdate(array('status' => $msg));
 $temp = $update_status->response;
 $result = json_encode($temp);
 echo "<div align='center'>Updated your Timeline Successfully.</div>";

 }

?>