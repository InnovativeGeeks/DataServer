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
    $sql = "SELECT panel_id, dataname, datatype, value, nominal FROM textPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

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
    $sql = "SELECT panel_id, dataname, datatype, min, max, nominal_min, nominal_max FROM randomPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res2 = mysqli_query($conn, $sql);
    $rescount2 = mysqli_num_rows($res2);
    mysqli_close($conn);

    $arr = array();
    if ($rescount != 0 || $rescount1 != 0 || $rescount2 != 0) {
        if ($rescount != 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $data = (object)array();
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->nominal = $row['nominal'];
                $data->value = $row['value'];

                array_push($arr, $data);
            }
        }

        if ($rescount1 != 0) {
            while ($row = mysqli_fetch_assoc($res1)) {
                $data = (object)array();
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->nominal_min = $row['nominal_min'];
                $data->nominal_max = $row['nominal_max'];
                $data->a = $row['a'];
                $data->b = $row['b'];
                $data->c = $row['c'];
                $data->d = $row['d'];
                $data->i = $row['i'];

                array_push($arr, $data);
            }
        }

        if ($rescount2 != 0) {
            while ($row = mysqli_fetch_assoc($res2)) {
                $data = (object)array();
                $data->panel_id = $row['panel_id'];
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->nominal_min = $row['nominal_min'];
                $data->nominal_max = $row['nominal_max'];
                $data->min = $row['min'];
                $data->max = $row['max'];

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
} else {
    echo 'username and panelname required'.PHP_EOL;
}
