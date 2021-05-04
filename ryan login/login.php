<?php
    require_once "./databaseConnect.php";

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $username = $data['username'];
    $password = $data['password'];

    //if username or password not set
    if(empty($username) || empty($password)){
        echo 'username and password required'.PHP_EOL;
    }
    else{
        $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $res = mysqli_query($conn, $sql);

        $rescount = mysqli_num_rows($res);

        if($rescount == 0){
            echo 'credentials are invalid'.PHP_EOL;
        }
        else {
            echo 'success'.PHP_EOL;
        }
    }
?>