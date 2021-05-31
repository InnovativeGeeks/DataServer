<?php
    function newconn(){
        $servername = "127.0.0.1";
        $username = "ryan";
        $password = "Angusdraper2";
        $db = "my_db";

        $conn = new mysqli($servername, $username, $password, $db);
        return $conn;
    }
