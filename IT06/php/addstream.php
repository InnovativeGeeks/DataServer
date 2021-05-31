<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$username = $data['username'];
$panelname = $data['panelname'];
$last_id = $data['panel_id'];
$streams = $data['streams'];

require_once "./databaseConnect.php";

if (isset($username) && isset($panelname) && isset($last_id) && isset($streams)) {
    $count = 0;

    foreach ($streams as $val) {
        $dn = $val['dataname'];
        $dt = $val['datatype'];

        //check if dataname exists
        $conn = newconn();
        $sql = "SELECT * FROM textPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        $conn = newconn();
        $sql = "SELECT * FROM sinPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        $conn = newconn();
        $sql = "SELECT * FROM randomPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        $conn = newconn();
        $sql = "SELECT * FROM textFilePanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        $conn = newconn();
        $sql = "SELECT * FROM numericCSVPanels WHERE panel_id = '$last_id' AND dataname = '$dn'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count += mysqli_num_rows($res);
        }
        mysqli_close($conn);

        if ($count == 0) {
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
                        echo "Stream not added! Duplicate datatnames not allowed";
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
                        echo "Stream not added! Duplicate datatnames not allowed";
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
            echo 'stream added successfully';
        }
        else{
            echo 'Stream not added! Duplicate datatnames not allowed';
        }
    }
} else {
    echo 'missing data';
}
