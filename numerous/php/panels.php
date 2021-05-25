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

if (isset($data['username'])) {
    //get panels matching username
    $conn = newconn();
    $sql = "SELECT panel_name, panel_id FROM panels NATURAL JOIN userPanels WHERE username='$username'";

    $res = mysqli_query($conn, $sql);
    $rescount = mysqli_num_rows($res);

    $arr = array();
    if ($rescount != 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $obj = (object)array();
            $obj->panel_name = $row['panel_name'];
            $obj->panel_id = $row['panel_id'];
            array_push($arr, $obj);
        }

        $myObj = (object)array();
        $myObj->panels = $arr;

        $myJSON = json_encode($myObj) . PHP_EOL;

        echo $myJSON;
        //echo json_encode($arr).PHP_EOL;
    } else {
        $myObj = (object)array();
        $myObj->panels = 'No panels found';

        $myJSON = json_encode($myObj, JSON_PRETTY_PRINT) . PHP_EOL;

        echo $myJSON;
        //echo 'no panels found'. PHP_EOL;
    }
} else {
    echo 'username is required' . PHP_EOL;
}