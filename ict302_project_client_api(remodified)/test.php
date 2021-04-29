<!DOCTYPE html>
<html>
<head>
	<title>data stream web interface</title>
	<link rel = "stylesheet" type = "text/css" href = "login.css">
	<link rel = "stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
	<form class = "form-container" action = "process.php" method = "POST" onsubmit="return validate()">
		<p id = "error"></p>
		<h3>Login</h3>

		<div class = "form-grp">
			<label for ="username"> Username</label><br>
			<input type = "text" name = "id" placeholder = "given userid" id = "userid">
			<i class = "fa fa-times u_times"></i>
			<i class = "fa fa-check u_check"></i>
		</div>

		<div class = "form-grp">
			<label for = "=password">Password</label><br>
			<input type = "text" name = "password" placeholder = "password" id = "userpassword">
			<i class = "fa fa-times p_times"></i>
			<i class = "fa fa-check p_check"></i>
		</div>

		<div class = "form-grp">
			<input type = "submit" name = "login-button" value = "login">
		</div>

	</for>
<script type = "text/javascript" src = "login.js"></script>
</body>
</html>