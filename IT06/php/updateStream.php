<?php

/**
 * Created by Ryan Draper
 * 33152216
 */

require_once "./databaseConnect.php";

//get data and decode
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$panel_id = $data['panel_id'];
$oldDataname = $data['oldDataname'];
$dataname = $data['dataname'];
$datatype = $data['datatype'];
$value = $data['value'];
$a =  $data['a'];
$min = $data['min'];
$filename = $data['filename'];

if (isset($value)) {
    $conn = newconn();

    $sql = "UPDATE textPanels SET dataname = '$dataname', datatype = '$datatype', value = '$value' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else if (isset($a)) {
    $b =  $data['b'];
    $c =  $data['c'];
    $d =  $data['d'];
    $i =  $data['i'];
    $nomMin = $data['nominal_min'];
    $nomMax = $data['nominal_max'];

    $conn = newconn();

    $sql = "UPDATE sinPanels SET dataname = '$dataname', datatype = '$datatype', a = '$a', b = '$b', c = '$c', d = '$d', i = '$i', nominal_min = '$nomMin', nominal_max = '$nomMax' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else if (isset($min)) {
    $max =  $data['max'];
    $nomMin = $data['nominal_min'];
    $nomMax = $data['nominal_max'];

    $conn = newconn();

    $sql = "UPDATE randomPanels SET dataname = '$dataname', datatype = '$datatype', min = '$min', max = '$max', nominal_min = '$nomMin', nominal_max = '$nomMax' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

    $res = mysqli_query($conn, $sql);
    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else if (isset($filename)) {
    $conn = newconn();

    if ($datatype == 'string') {
        $sql = "UPDATE textFilePanels SET dataname = '$dataname', datatype = '$datatype', filename = '$filename' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

        $res = mysqli_query($conn, $sql);
    }

    if ($datatype == 'float') {
        $nomMin = $data['nomMin'];
        $nomMax = $data['nomMax'];
        $sql = "UPDATE numericCSVPanels SET dataname = '$dataname', datatype = '$datatype', filename = '$filename', nominal_min = '$nomMin', nominal_max = '$nomMax' WHERE panel_id = '$panel_id' AND dataname = '$oldDataname'";

        $res = mysqli_query($conn, $sql);
    }

    if ($res) {
        echo 'updated';
    } else {
        echo 'error - not updated';
    }
    mysqli_close($conn);
} else {
    echo 'error - not updated';
}
