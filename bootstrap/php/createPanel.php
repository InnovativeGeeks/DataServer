<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$username = $data['username'];
$panelname = $data['panelname'];
$streams = $data['streams'];

require_once "./databaseConnect.php";

//get number of panels
$conn = newconn();
$sql = "SELECT count(*) as numofpanels from panels";
$res = mysqli_query($conn, $sql);
if (!$res) {
    echo "An error occured. Panel not added!";
    exit();
} else {
    $row = mysqli_fetch_assoc($res);
    //create id of next panel
    $id = $row['numofpanels'] + 1;
}
mysqli_close($conn);

//check if panelname exists for user
$conn = newconn();
$sql = "SELECT count(*) as num FROM panels NATURAL JOIN userPanels WHERE panel_name = '$panelname' AND username = '$username';";
$res = mysqli_query($conn, $sql);
if (!$res) {
    echo "An error occured. Panel not added!";
    exit();
} else {
    $row = mysqli_fetch_assoc($res);
    $count = $row['num'];

    if ($count > 0) {
        echo "Panel not added! Panel name already exists";
        exit();
    }
}
mysqli_close($conn);

//insert panel
$conn = newconn();
$sql = "INSERT INTO panels (panel_id, panel_name) VALUES ('$id', '$panelname');";
if (!mysqli_query($conn, $sql)) {
    echo "An error occured. Panel not added!";
    exit();
}
mysqli_close($conn);

//insert userPanels
$conn = newconn();
$sql = "INSERT INTO userPanels (panel_id, username) VALUES ('$id', '$username');";
if (!mysqli_query($conn, $sql)) {
    echo "Panel not added! An error occured.";
    exit();
}
mysqli_close($conn);

foreach ($streams as $val) {
    $dn = $val['dataname'];
    $dt = $val['datatype'];

    if (isset($val['function'])) {
        $function = $val['function'];

        if ($function == 'sin') {
            $a = $val['a'];
            $b = $val['b'];
            $c = $val['c'];
            $d = $val['d'];
            $i = $val['i'];

            //insert sin panel
            $conn = newconn();
            $sql = "INSERT INTO sinPanels (panel_id, dataname, datatype, a, b, c, d, i) 
                    VALUES ('$id', '$dn', '$dt', '$a', '$b', '$c', '$d', '$i');";
            if (!mysqli_query($conn, $sql)) {
                echo "Panel not added! Duplicate datatnames not allowed";
                exit();
            }
            mysqli_close($conn);
        } else {
            $min = $val['min'];
            $max = $val['max'];

            //insert random panel
            $conn = newconn();
            $sql = "INSERT INTO randomPanels (panel_id, dataname, datatype, min, max) 
                                VALUES ('$id', '$dn', '$dt', '$min', '$max');";
            if (!mysqli_query($conn, $sql)) {
                echo "Panel not added! Duplicate datatnames not allowed";
                exit();
            }
            mysqli_close($conn);
        }
    } else {
        $value = $val['value'];

        //insert text panel
        $conn = newconn();
        $sql = "INSERT INTO textPanels (panel_id, dataname, datatype, value) 
                VALUES ('$id', '$dn', '$dt', '$value');";
        if (!mysqli_query($conn, $sql)) {
            echo "Panel not added! Duplicate datatnames not allowed";
            exit();
        }
        mysqli_close($conn);
    }
}
echo 'panel created successfully';
