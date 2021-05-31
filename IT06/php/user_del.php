<?php
//接收ID
if(!empty($_GET)){

    $id = $_GET['username'];

    try{
        require 'databaseConnect.php';

        $sql = "DELETE FROM users where username='{$id}';";

        $conn = newconn();

        $result = mysqli_query($conn, $sql);

        if($result){
            echo "<script>alert('delete successful！');window.history.back();</script>";
        }else{
            echo "<script>alert('delete failed！');window.history.back();</script>";
        }
    }
    catch (Exception $e){
        echo "error:". $e->getMessage();
    }
}
else{
    echo "<script>alert(plz select the data u wanna delete！');window.history.back();</script>";
}
