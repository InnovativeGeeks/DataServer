<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$username = $data['username'];
$panelname = $data['panelname'];
$streams = $data['streams'];

require_once "./databaseConnect.php";

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
$sql = "INSERT INTO panels (panel_name) VALUES ('$panelname');";
if (!mysqli_query($conn, $sql)) {
    echo "An error occured. Panel not added!";
    exit();
}
//get the id of inserted panel
$last_id = mysqli_insert_id($conn);
mysqli_close($conn);

//insert userPanels
$conn = newconn();
$sql = "INSERT INTO userPanels (panel_id, username) VALUES ('$last_id', '$username');";
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
            $nominal_min = $val['nominal_min'];
            $nominal_max = $val['nominal_max'];

            //insert sin panel
            $conn = newconn();
            $sql = "INSERT INTO sinPanels (panel_id, dataname, datatype, a, b, c, d, i, nominal_min, nominal_max) 
                    VALUES ('$last_id', '$dn', '$dt', '$a', '$b', '$c', '$d', '$i', '$nominal_min', '$nominal_max');";
            if (!mysqli_query($conn, $sql)) {
                echo "Sin stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        } else {
            $min = $val['min'];
            $max = $val['max'];
            $nominal_min = $val['nominal_min'];
            $nominal_max = $val['nominal_max'];

            //insert random panel
            $conn = newconn();
            $sql = "INSERT INTO randomPanels (panel_id, dataname, datatype, min, max, nominal_min, nominal_max) 
                                VALUES ('$last_id', '$dn', '$dt', '$min', '$max', '$nominal_min', '$nominal_max');";
            if (!mysqli_query($conn, $sql)) {
                echo "Random stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        }
    } else if (isset($val['value'])) {
        $value = $val['value'];

        //insert text panel
        $conn = newconn();
        $sql = "INSERT INTO textPanels (panel_id, dataname, datatype, value) 
                VALUES ('$last_id', '$dn', '$dt', '$value');";
        if (!mysqli_query($conn, $sql)) {
            echo "Text stream not added! An error occured";
            exit();
        }
        mysqli_close($conn);
    } else {
        $directory = $val['directory'];
        $filename = $val['filename'];

        if ($dt == 'string') {
            //insert textFile panel
            $conn = newconn();
            $sql = "INSERT INTO textFilePanels (panel_id, dataname, datatype, directory, filename) 
                        VALUES ('$last_id', '$dn', '$dt', '$directory', '$filename');";
            if (!mysqli_query($conn, $sql)) {
                echo "Text file stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        } else if ($dt == 'float') {
            //insert numericCSVPanels
            $conn = newconn();
            $sql = "INSERT INTO numericCSVPanels (panel_id, dataname, datatype, directory, filename) 
                                    VALUES ('$last_id', '$dn', '$dt', '$directory', '$filename');";
            if (!mysqli_query($conn, $sql)) {
                echo "Text file stream not added! An error occured";
                exit();
            }
            mysqli_close($conn);
        }
    }
}
echo 'panel created successfully';
