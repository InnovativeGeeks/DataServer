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
$dataname = $data['dataname'];

if (isset($data['panel_id']) && isset($data['dataname'])) {
    $conn = newconn();
    //check that data returns result before deleting
    $sql = "SELECT * FROM textPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
    $count = 0;
    $res = mysqli_query($conn, $sql);
    if ($res) {
        $count = mysqli_num_rows($res);
    }
    mysqli_close($conn);

    if ($count > 0) {
        $conn = newconn();
        $sql = "DELETE FROM textPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            echo 'removed';
        } else {
            'an error occured';
        }
        mysqli_close($conn);
    } else {
        $conn = newconn();
        //check that data returns result before deleting
        $sql = "SELECT * FROM sinPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
        $count = 0;
        $res = mysqli_query($conn, $sql);
        if ($res) {
            $count = mysqli_num_rows($res);
        }
        mysqli_close($conn);

        if ($count > 0) {
            $conn = newconn();
            $sql = "DELETE FROM sinPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
            $res = mysqli_query($conn, $sql);
            if ($res) {
                echo 'removed';
            } else {
                'an error occured';
            }
            mysqli_close($conn);
        } else {
            $conn = newconn();
            //check that data returns result before deleting
            $sql = "SELECT * FROM randomPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
            $count = 0;
            $res = mysqli_query($conn, $sql);
            if ($res) {
                $count = mysqli_num_rows($res);
            }
            mysqli_close($conn);

            if ($count > 0) {
                $conn = newconn();
                $sql = "DELETE FROM randomPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
                $res = mysqli_query($conn, $sql);
                if ($res) {
                    echo 'removed';
                } else {
                    'an error occured';
                }
                mysqli_close($conn);
            } else {
                $conn = newconn();
                //check that data returns result before deleting
                $sql = "SELECT * FROM textFilePanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
                $count = 0;
                $res = mysqli_query($conn, $sql);
                if ($res) {
                    $count = mysqli_num_rows($res);
                }
                mysqli_close($conn);

                if ($count > 0) {
                    $conn = newconn();
                    $sql = "DELETE FROM textFilePanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
                    $res = mysqli_query($conn, $sql);
                    if ($res) {
                        echo 'removed';
                    } else {
                        'an error occured';
                    }
                    mysqli_close($conn);
                } else {
                    $conn = newconn();
                    //check that data returns result before deleting
                    $sql = "SELECT * FROM numericCSVPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
                    $count = 0;
                    $res = mysqli_query($conn, $sql);
                    if ($res) {
                        $count = mysqli_num_rows($res);
                    }
                    mysqli_close($conn);

                    if ($count > 0) {
                        $conn = newconn();
                        $sql = "DELETE FROM numericCSVPanels WHERE panel_id = '$panel_id' AND dataname = '$dataname'";
                        $res = mysqli_query($conn, $sql);
                        if ($res) {
                            echo 'removed';
                        } else {
                            'an error occured';
                        }
                        mysqli_close($conn);
                    }
                }
            }
        }
    }
} else {
    echo 'panel id and dataname required' . PHP_EOL;
}
