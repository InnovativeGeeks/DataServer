<?php
//get json data
$js = file_get_contents('php://input');

//decode json
$data = json_decode($js, true);

$username = $data['username'];
$panelname = $data['panelname'];
$dataname = $data['dataname'];
$currentval = $data['currentval'];
$stream = $data['stream'];

echo $username.PHP_EOL.$panelname.PHP_EOL.$dataname.PHP_EOL.$currentval.PHP_EOL.$stream;

require_once "./databaseConnect.php";

$conn = newconn();

//select query
$sql = "INSERT INTO panel
(panelname, username, dataname, datatype, nominal_min, nominal_max, currentval, stream)
VALUES
('$panelname','$username', '$dataname', '', '', '', '$currentval', '$stream')";
$result = mysqli_query($conn, $sql);

if($result){
    echo "created";
}
else {
    echo "error";
}
?>