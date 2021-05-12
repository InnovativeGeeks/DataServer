<?php
/**
 * Created by Ryan Draper
 * 33152216
 */

function updatePanel($username,$panelname,$dataname)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    $sql = "DELETE FROM panel WHERE panelname = '$panelname' AND dataname = '$dataname' AND username = '$username'";

    return mysqli_query($conn, $sql);
}

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get username and password
$username = $data['username'];
$panelname = $data['panelname'];
$dataname = $data['dataname'];

$success= updatePanel($username,$panelname,$dataname);
if ($success) {
    echo 'success';
} else {
    echo 'error';
}
