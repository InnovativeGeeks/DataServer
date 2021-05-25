<?php
    function newconn(){
        $servername = "mysql-server";
        $username = "it06";
        $password = "innovativegeeks";
        $db = "it06";

        $conn = new mysqli($servername, $username, $password, $db);
        return $conn;
    }
