<?php

/**
 * Created by Ryan Draper
 * 33152216
 */

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get username and password
$username = $data['username'];
$password = $data['password'];

require_once "./databaseConnect.php";

$conn = newconn();

//select query
$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    $role = $row['role'];
}

//count number of rows
$count = mysqli_num_rows($result);

echo $myJSON;

if ($count != 0) {
    $myObj = (object)array();
    $myObj->message = 'success';
    $myObj->role = "$role";

    $myJSON = json_encode($myObj);
    echo $myJSON;
} else {
    $myObj = (object)array();
    $myObj->message = 'invalid';

    $myJSON = json_encode($myObj);
    echo $myJSON;
}
