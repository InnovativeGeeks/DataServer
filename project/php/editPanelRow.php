<?php

/**
 * Created by Ryan Draper
 * 33152216
 */

require_once "./databaseConnect.php";

$username = $_POST['username'];
$password = $_POST['password'];
$panelname = $_POST['panelname'];
$password = $_POST['password'];
$dataname = $_POST['source'];

$conn = newconn();

//get panels matching username
$sql = "SELECT  dataname, datatype, nominal_min, nominal_max, currentval FROM panel natural join users where panelname = '$panelname' AND username = '$username' AND password = '$password' and dataname = '$dataname'";

$res = mysqli_query($conn, $sql);

$arr = array();
while ($r = mysqli_fetch_assoc($res)) {
    array_push($arr, $r);
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Update Panel</title>
    <script type="text/javascript" src="../js/editPanelRow.js"></script>
</head>

<body>
    <h1>Panel details</h1>
    <form id="updateForm" method='post' onsubmit="return validate()" action="./panels.php">
        <!-- hidden from user-->
        <input type="text" hidden="true" name="username" id="username" value="<?php echo $username ?>"></input>
        <input type="text" hidden="true" name="password" id="password" value="<?php echo $password ?>"></input>
        <input type="text" hidden="true" name="panelname" id="panelname" value="<?php echo $panelname ?>"></input>
        <input type="text" hidden="true" name="oldDataName" id="oldDataName" value="<?php echo $dataname ?>"></input>

        <label>dataname</label><br/>
        <input type='text' id='dataname' name='dataname' value="<?php echo $arr[0]['dataname'] ?>" /><br /><br />
        <label>datatype</label><br/>
        <input type='text' id='datatype' name='datatype' value="<?php echo $arr[0]['datatype'] ?>" /><br /><br />
        <label>nominal min</label><br/>
        <input type='text' id='min' name='min' value="<?php echo $arr[0]['nominal_min'] ?>" /><br /><br />
        <label>nominal max</label><br/>
        <input type='text' id='max' name='max' value="<?php echo $arr[0]['nominal_max'] ?>" /><br /><br />
        <label>current value</label><br/>
        <input type='text' id='currentval' name='currentval' value="<?php echo $arr[0]['currentval'] ?>" /><br /><br />
        <input type="button" value="delete" onclick="deleteRow()"/>
        <input type="submit" value="update" />
    </form>
</body>

</html>