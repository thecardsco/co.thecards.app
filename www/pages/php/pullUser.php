<?
	include('connect.php');
	$sql=mysqli_query($con,"SELECT * FROM users WHERE username='".$_GET['q']."'");
	$user = $sql->fetch_assoc();
	echo json_encode($user);
?>