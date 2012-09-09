<!DOCTYPE HTML>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>FileUp</title>
</head>
<body>
<h1>FileUp</h1>

<form action="./index.php" method="post" enctype="multipart/form-data">
	<p><input type="file" name="file_path[]" id="file_path[]" multiple /></p>
	<p><input type="submit" value="submit" /></p>
</form>

</body>
</html>

<?php
$uploads_dir = '/usr/htdocs/';
//var_dump($_FILES);

if($_FILES['file_path'])
{
	//echo "YES";
	foreach($_FILES['file_path']['tmp_name'] as $key=>$value)
	{
		$file_name = $_FILES['file_path']['name'][$key];
		$tmp_name  = $_FILES['file_path']['tmp_name'][$key];
		//move_uploaded_file($tmp_name, $uploads_dir . $key . "_" . $file_name);
		move_uploaded_file($tmp_name, $uploads_dir . $file_name);
	}

}else{
	//echo "NO";
}
?>
