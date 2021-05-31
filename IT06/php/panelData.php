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
    $sql = "SELECT dataname, datatype, value FROM textPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res = mysqli_query($conn, $sql);
    $rescount = mysqli_num_rows($res);
    mysqli_close($conn);

    $conn = newconn();

    //get text file panels
    $sql = "SELECT dataname, datatype, directory, filename FROM textFilePanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res0 = mysqli_query($conn, $sql);
    $rescount0 = mysqli_num_rows($res0);
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

    $conn = newconn();
    //get numeric file panels
    $sql = "SELECT panel_id, dataname, datatype, filename, directory FROM numericCSVPanels natural join userPanels natural join panels where panel_name = '$panelname' AND username = '$username'";

    $res3 = mysqli_query($conn, $sql);
    $rescount3 = mysqli_num_rows($res3);
    mysqli_close($conn);

    $arr = array();
    if ($rescount != 0 || $rescount0 != 0 || $rescount1 != 0 || $rescount2 != 0 || $rescount3 != 0) {
        //text panels
        if ($rescount != 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $data = (object)array();
                $data->dataname = $row['dataname'];
                $data->datatype = $row['datatype'];
                $data->value = $row['value'];

                array_push($arr, $data);
            }
        }

        //text file panels
        if ($rescount0 != 0) {
            while ($row = mysqli_fetch_assoc($res0)) {
                //file paths
                $root = $_SERVER['DOCUMENT_ROOT'];
                $filename = $row['filename'];
                $directory = $row['directory'];
                $myfile = $root . "/data" ."/". $directory . "/" . $filename;

                if (!file_exists($myfile)) {
                    $data = (object)array();
                    $data->dataname = $row['dataname'];
                    $data->datatype = $row['datatype'];
                    $data->value = 'file removed. Cannot read value';
                    $data->filename = $row['filename'];

                    array_push($arr, $data);
                } else {
                    //open file, read data and close file
                    $fl = fopen($myfile, "r");
                    $cont = '';
                    while (!feof($fl)) {
                        $line = fgets($fl);
                        $cont = $cont . $line;
                    }
                    fclose($fl);

                    $data = (object)array();
                    $data->dataname = $row['dataname'];
                    $data->datatype = $row['datatype'];
                    $data->value = $cont;
                    $data->filename = $row['filename'];

                    array_push($arr, $data);
                }
            }
        }

        //sin panels
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

        //random panels
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

        //nominal file
        if ($rescount3 != 0) {
            while ($row = mysqli_fetch_assoc($res3)) {
                //file paths
                $root = $_SERVER['DOCUMENT_ROOT'];
                $filename = $row['filename'];
                $directory = $row['directory'];
                $myfile = $root . "/data" ."/". $directory . "/" . $filename;

                //open file, read data and close file

                if (!file_exists($myfile)) {
                    $all = array();

                    $ar = (object)array();
                    $ar->dataname = $row['dataname'];
                    $ar->currentval = 'file removed. Cannot read value';
                    array_push($all, $ar);

                    $data = (object)array();
                    $data->dataname = $row['dataname'];
                    $data->datatype = $row['datatype'];
                    $data->value = $all;
                    $data->filename = $row['filename'];

                    array_push($arr, $data);
                } else {
                    //get headers from csv
                    $filen = fopen($myfile, "r");
                    $filerow = fgetcsv($filen);
                    fclose($filen);

                    //get last row of data from csv first column
                    $rows = file($myfile);
                    $last_row = array_pop($rows);
                    $dta = str_getcsv($last_row);

                    $all = array();
                    for ($i = 0; $i < count($filerow); $i++) {
                        $ar = (object)array();
                        if ($filerow[$i] == $row['dataname']) {
                            $ar->dataname = $filerow[$i];
                            $ar->currentval = $dta[$i];
                            array_push($all, $ar);
                        }
                    }

                    $data = (object)array();
                    $data->dataname = $row['dataname'];
                    $data->datatype = $row['datatype'];
                    $data->value = $all;
                    $data->filename = $row['filename'];

                    array_push($arr, $data);
                }
            }
        }

        $json = (object)array();
        $json->panelname = $panelname;
        $json->paneldata = $arr;
        $finalJson = json_encode($json, JSON_PRETTY_PRINT) . PHP_EOL;
        echo $finalJson;

        //update increment value for sin panels
        if ($rescount1 != 0) {
            $conn = newconn();
            //update increment value
            $inc += 0.1;
            //get sin panels
            $sql = "UPDATE sinPanels SET i = '$inc' WHERE panel_id = '$panelid' AND dataname = '$dataname'";

            mysqli_query($conn, $sql);
            mysqli_close($conn);
        }
    } else {
        echo 'no panels found' . PHP_EOL;
    }
} else {
    echo 'username and panelname required' . PHP_EOL;
}
