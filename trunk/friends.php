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
	$response = $twitterObj->get_friendsIds(array('screen_name' => $_GET['screen_name']));
	$friendsIds = json_decode($response->resp->data);
	$friendsInfo = getFriendsInfo($twitterObj, $friendsIds->ids);
	echo json_encode($friendsInfo);
//	echo $response->resp->data;
 }
 else
 {
 	echo "{ error: 'Gabulous - NOT AUTHORIZED'}";
 }
 
 function getFriendsInfo($twitterObj, $ids)
 {
 	$result = array();
 	$count = count($ids);
 	for ($i = 0; $i < $count; $i++)
 	{
 		$id = $ids[$i];
 		$info = $twitterObj->get_usersLookup(array('user_id' => $id));
 		array_push($result, json_decode($info->resp->data));
 	}

	// error_log("RESULT: " . serialize($result));
	 	
 	return $result;
 }
 ?>