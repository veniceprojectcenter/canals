<?php
	
	require_once("./puntasalute.php");
	require_once('firebaseLib.php');
	
	$url = 'https://blistering-inferno-7515.firebaseio.com/';
	$fb = new fireBase($url);
		
	$current_level = getCurrentTideLevel();
	$fb->set('', $current_level);
	
?>