<?php
    function newconn(){
        $servername = "localhost";
        $username = "it06";
        $password = "innovativegeeks";
        $db = "my_db";

        $conn = new mysqli($servername, $username, $password, $db);
        return $conn;
    }
?>