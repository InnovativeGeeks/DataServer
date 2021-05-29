<?php
//接收ID
if(!empty($_GET)){

    $id = $_GET['username'];

    //异常监听
    try{
        //主机名 用户名 密码 数据库
        require 'databaseConnect.php';

        $sql = "DELETE FROM users where username='{$id}';";

        $conn = newconn();

        $result = mysqli_query($conn, $sql);

        if($result){
            echo "<script>alert('删除成功！');window.history.back();</script>";
        }else{
            echo "<script>alert('删除失败！');window.history.back();</script>";
        }
    }
    catch (Exception $e){
        echo "有点点小错误:". $e->getMessage();
    }
}
else{
    echo "<script>alert('请选择需要删除的数据！');window.history.back();</script>";
}
