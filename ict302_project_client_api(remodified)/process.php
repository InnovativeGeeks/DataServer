<?php
    $username = $_POST['userid'];
    $password = $_POST['userpassword'];
    $db = new mysqli;

    $username = stripcslashes($username);
    $password = stripcslashes($password);
    $username = mysqli_real_escape_string($db,$username);
    $password = mysqli_real_escape_string($db,$password);

    mysqli_connect('localhost','it06','innovativegeeks','mysql');
    if(!$conn)
    {
        echo 'Connection error: ' .mysqli_connect_error();
    }

    $result = mysqli_query($conn,"SELECT * from TESTUSER where USERNAME = '$username' and PASSWORD = '$password'");

    $row = mysqli_fetch_array($result);

    if($row['USERNAME'] == $username && $row['PASSWORD'] == $password )
    {
        echo "login successful, welcome".$row['USERNAME'];
    }
    else
    {
        echo "login failed, invalid/unregistered user";
    }
?>