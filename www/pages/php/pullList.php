<?
	include('connect.php');
	$result = mysqli_query($con, "SELECT * FROM likes WHERE liker='".$_GET['q']."'");

	if ($result -> num_rows > 0)
	{
		while ($row=mysqli_fetch_array($result))
		{
			$fav_id=$row['liked'];
			$fav_result=mysqli_query($con, "SELECT * FROM users WHERE id='$fav_id' AND authorized='1' ");
			if ($fav_result -> num_rows>0)
			{
				
				while($fav_row = mysqli_fetch_array($fav_result))
				{
					$favs[]=json_encode($fav_row);
				}
			}
		}
	}
	echo json_encode($favs);
?>