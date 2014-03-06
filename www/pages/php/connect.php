<?
	header('Access-Control-Allow-Origin: *');
	$con=mysqli_connect("localhost","thecards_users","Pin@1989","thecards_users");
	$email="ozan@thecards.co";
	$password=md5(sha1('Pin@1989'));
	if (mysqli_connect_errno($con))
	{
		exit;
	}
	mysqli_set_charset($con,"utf8");
?>