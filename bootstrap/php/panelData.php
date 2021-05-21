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

$conn = newconn();

//get panels matching username
$sql = "SELECT dataname, datatype, value FROM textPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

$res = mysqli_query($conn, $sql);
$rescount = mysqli_num_rows($res);
mysqli_close($conn);

$conn = newconn();

//get panels matching username
$sql = "SELECT dataname, datatype, a, b, c, d, i FROM sinPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

$res1 = mysqli_query($conn, $sql);
$rescount1 = mysqli_num_rows($res1);
mysqli_close($conn);

$conn = newconn();

//get panels matching username
$sql = "SELECT dataname, datatype, max, min FROM randomPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

$res2 = mysqli_query($conn, $sql);
$rescount2 = mysqli_num_rows($res2);
mysqli_close($conn);

$arr = array();
if ($rescount != 0) {
    while ($row = mysqli_fetch_assoc($res)) {
        $data = (object)array();
        $data->dataname = $row['dataname'];
        $data->datatype = $row['datatype'];
        $data->value = $row['value'];

        array_push($arr, $data);
    }

    if ($rescount1 != 0) {
        $c;
        while ($row = mysqli_fetch_assoc($res1)) {
            $data = (object)array();
            $data->dataname = $row['dataname'];
            $data->datatype = $row['datatype'];
            $data->value = $row['a'] * sin(($row['b'] * $row['i']) + $row['c']) + $row['d'];
            $c = $row['i'];

            array_push($arr, $data);
        }
    }

    if ($rescount2 != 0) {
        while ($row = mysqli_fetch_assoc($res2)) {
            $data = (object)array();
            $data->dataname = $row['dataname'];
            $data->datatype = $row['datatype'];
            $min = $row['min'];
            $max = $row['max'];
            $data->value = rand($max, $min);

            array_push($arr, $data);
        }
    }

    $json = (object)array();
    $json->panelname = $panelname;
    $json->paneldata = $arr;
    echo json_encode($json, JSON_PRETTY_PRINT) . PHP_EOL;
} else {
    echo 'no panels found' . PHP_EOL;
}
