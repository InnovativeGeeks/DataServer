<?php

/**
 * Created by Ryan Draper
 * 33152216
 */

require_once "./databaseConnect.php";

//get data and decode
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$username = $data['username'];
$panelname = $data['panelname'];
$password = $data['password'];

$conn = newconn();

//get panels matching username
$sql = "SELECT dataname, datatype, nominal_min, nominal_max, currentval FROM panel natural join users where panelname = '$panelname' AND username = '$username' AND password = '$password'";

$res = mysqli_query($conn, $sql);
$rescount = mysqli_num_rows($res);

$arr = array();
if ($rescount != 0) {
    while ($row = mysqli_fetch_assoc($res)) {
        $data = (object)array();
        $data->dataname = $row['dataname'];
        $data->datatype = $row['datatype'];
        $data->nominal_min = $row['nominal_min'];
        $data->nominal_max = $row['nominal_max'];
        $data->currentval = $row['currentval'];

        array_push($arr, $data);
    }

    $json = (object)array();
    $json->panelname = $panelname;
    $json->paneldata = $arr;

    echo json_encode($json, JSON_PRETTY_PRINT) . PHP_EOL;
    
} else {
    echo 'no panels found' . PHP_EOL;
}
