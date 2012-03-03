<?php

include 'lib/EpiCurl.php';
include 'lib/EpiOAuth.php';
include 'lib/EpiTwitter.php';
include 'lib/secret.php';

 if ($_SESSION['ot'] && $_SESSION['ots'])
 {
 	$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);
 	$ot = $_SESSION['ot'];
 	$ots = $_SESSION['ots'];
	$twitterObj->setToken($ot, $ots);
	$timeline = $twitterObj->get_usersLookup(array('user_id' => $_GET['user_id']));
	echo $timeline->resp->data;
 }
 else
 {
 	echo "{ error: 'Gabulous - NOT AUTHORIZED'}";
 }
 ?>