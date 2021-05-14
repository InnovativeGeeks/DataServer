<?php
/**
 * Created by Ryan Draper
 * 33152216
 */

function updatePanel($username,$oldDataName,$panelname,$dataname,$datatype,$min,$max,$currentval)
{
    require_once "./databaseConnect.php";

    $conn = newconn();

    $sql = "UPDATE panel SET
    panelname = '$panelname',
    dataname = '$dataname',
    username = '$username',
    datatype = '$datatype',
    nominal_min = '$min',
    nominal_max = '$max',
    currentval = $currentval
    WHERE panelname = '$panelname' AND dataname = '$oldDataName' AND username = '$username'";

    return mysqli_query($conn, $sql);
}

//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

//get username and password
$username = $data['username'];
$password = $data['password'];
$oldDataName = $data['oldDataName'];
$panelname = $data['panelname'];
$dataname = $data['dataname'];
$datatype = $data['datatype'];
$min = $data['nominal_min'];
$max = $data['nominal_max'];
$currentval = $data['currentval'];

$success= updatePanel($username,$oldDataName,$panelname,$dataname,$datatype,$min,$max,$currentval);
if ($success) {
    echo 'success';
} else {
    echo 'error';
}
