<?php
/**
 * Created by Ryan Draper
 * 33152216
 */

function checkUser($u, $p)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    //select query
    $sql = "SELECT * FROM users WHERE username='$u' AND password='$p'";
    $result = mysqli_query($conn, $sql);

    //count number of rows
    $count = mysqli_num_rows($result);

    return $count;
}

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get username and password
$username = $data['username'];
$password = $data['password'];

$count = checkUser($username, $password);
if ($count != 0) {
    echo 'success';
} else {
    echo 'invalid';
}
