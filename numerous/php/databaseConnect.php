<?php
    function newconn(){
        $servername = "";
        $username = "";
        $password = "";
        $db = "";

        $conn = new mysqli($servername, $username, $password, $db);
        return $conn;
    }
