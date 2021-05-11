<?php
$username = $_POST['username'];
$panelname = $_POST['panelname'];

require_once "./databaseConnect.php";

$conn = newconn();

//select query
$sql = "INSERT INTO panel
(panelname, username, dataname, datatype, nominal, min, max)
VALUES
('$panelname','$username', '', '', '', '', '')";
$result = mysqli_query($conn, $sql);

if($result){
    echo "created";
}
else {
    echo "error";
}
?>