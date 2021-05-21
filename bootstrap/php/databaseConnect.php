<?php
/**
 * Created by Ryan Draper
 * 33152216
 */

    function newconn(){
        $servername = "10.51.33.228";
        $username = "root";
        $password = "innovativegeeks";
        $db = "my_db";

        $conn = new mysqli($servername, $username, $password, $db);
        return $conn;
    }
