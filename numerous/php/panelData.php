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

if (isset($data['username']) && isset($data['panelname'])) {
    $conn = newconn();

    //get text panels
    $sql = "SELECT dataname, datatype, value, nominal FROM textPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res = mysqli_query($conn, $sql);
    $rescount = mysqli_num_rows($res);
    mysqli_close($conn);

    $conn = newconn();

    //get sin panels
    $sql = "SELECT panel_id, dataname, datatype, a, b, c, d, i, nominal_min, nominal_max FROM sinPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res1 = mysqli_query($conn, $sql);
    $rescount1 = mysqli_num_rows($res1);
    mysqli_close($conn);

    $conn = newconn();

    //get random panels
    $sql = "SELECT dataname, datatype, max, min, nominal_min, nominal_max FROM randomPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res2 = mysqli_query($conn, $sql);
    $rescount2 = mysqli_num_rows($res2);
    mysqli_close($conn);

    $arr = array();
    if ($rescount != 0 || $rescount1 != 0 || $rescount2 != 0) {
        if ($rescount != 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $data = (object)array();
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->value = $row['value'];
                $data->nominal = $row['nominal'];

                array_push($arr, $data);
            }
        }

        if ($rescount1 != 0) {
            while ($row = mysqli_fetch_assoc($res1)) {
                $data = (object)array();
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->value = $row['a'] * sin(($row['b'] * $row['i']) + $row['c']) + $row['d'];
                $data->nominal_min = $row['nominal_min'];
                $data->nominal_max = $row['nominal_max'];
                $inc = $row['i'];
                $dataname = $row['dataname'];
                $panelid = $row['panel_id'];
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
                $data->nominal_min = $row['nominal_min'];
                $data->nominal_max = $row['nominal_max'];

                array_push($arr, $data);
            }
        }

        $json = (object)array();
        $json->panelname = $panelname;
        $json->paneldata = $arr;
        $finalJson = json_encode($json, JSON_PRETTY_PRINT) . PHP_EOL;
        echo $finalJson;

        $conn = newconn();
        //update increment value
        $inc += 0.1;
        //get sin panels
        $sql = "UPDATE sinPanels SET i = '$inc' WHERE panel_id = '$panelid' AND dataname = '$dataname'";

        mysqli_query($conn, $sql);
        mysqli_close($conn);
    } else {
        echo 'no panels found' . PHP_EOL;
    }
} else {
    echo 'username and panelname required'.PHP_EOL;
}
