<?php
/**
 * Created by Ryan Draper
 * 33152216
 */

function checkUser($u)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    //select query
    $sql = "SELECT username FROM users WHERE username='$u'";
    $result = mysqli_query($conn, $sql);

    $count = mysqli_num_rows($result);

    return $count;
}

function createUser($u, $p)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    //insert query
    $sql = "INSERT INTO users (username, password) VALUES ('$u', '$p')";

    if (mysqli_query($conn, $sql)) {
        return true;
    } else {
        return false;
    }
}

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get username and password
$username = $data['username'];
$password = $data['password'];

$count = checkUser($username);
if ($count == 0) {
    if (createUser($username, $password)) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'usertaken';
}