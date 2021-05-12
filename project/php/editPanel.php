<?php

/**
 * Created by Ryan Draper
 * 33152216
 */

require_once "./databaseConnect.php";

$username = $_POST['username'];
$panelname = $_POST['panelname'];
$password = $_POST['password'];

$conn = newconn();

//get panels matching username
$sql = "SELECT dataname FROM panel NATURAL JOIN users WHERE username='$username' AND password='$password' AND panelname='$panelname'";

$res = mysqli_query($conn, $sql);
$rescount = mysqli_num_rows($res);

echo "<h1>$panelname</h1>";

$arr = array();
while ($row = mysqli_fetch_assoc($res)) {
    array_push($arr, $row['dataname']);
}
?>

<html>

<body>
    <form method="post" action="./editPanelRow.php">
        <input type="text" hidden="true" name="username" id="username" value="<?php echo $username ?>"></input>
        <input type="text" hidden="true" name="password" id="password" value="<?php echo $password ?>"></input>
        <input type="text" hidden="true" name="panelname" id="panelname" value="<?php echo $panelname ?>"></input>

        <select id="source" name="source">
            <?php
            foreach ($arr as $v) {
                echo "<option>$v</option>";
            }
            ?>
        </select><br/><br/>
        <input type="submit" value="update" />
    </form>
</body>

</html>