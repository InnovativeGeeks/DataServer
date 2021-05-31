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
$id = $data['panelid'];

if(isset($data['username']) && isset($data['panelid'])){
    $conn = newconn();
    //check that data returns result before deleting
    $sql = "SELECT * FROM userPanels WHERE username='$username' AND panel_id = '$id'";
    $count = 0;
    $res = mysqli_query($conn, $sql);
    if($res){
        $count = mysqli_num_rows($res);
    }
    mysqli_close($conn);

    if($count > 0){
        $conn = newconn();
        $sql = "DELETE FROM userPanels WHERE username='$username' AND panel_id = '$id'";
        $res = mysqli_query($conn, $sql);
        mysqli_close($conn);
        
        $conn = newconn();
        $sql = "DELETE FROM panels WHERE panel_id = '$id'";
        $res = mysqli_query($conn, $sql);
        if($res){
            echo 'deleted'.PHP_EOL;
        }
        else{
            echo 'an error occured. Panel not deleted'.PHP_EOL;
        }
        mysqli_close($conn);
    }
    else{
        echo 'invalid username/panelid'.PHP_EOL;
    }
}
else{
    echo 'invalid username/panelid'.PHP_EOL;
}