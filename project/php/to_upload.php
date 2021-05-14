<?php
/**
 * Created by PhpStorm.
 * User: 冰淇淋
 * Date: 2021/5/6
 * Time: 22:41
 * Use :
 */
//$file = file_get_contents($_FILES['file']['tmp_name']);
require "./databaseConnect.php";
$file = file($_FILES['file']['tmp_name']);
$values = "";
foreach ($file as $k=>$v){
    if ($k == 0) continue;
    $arr = explode(' ',$v);
    $utc = $arr[0];
    $ev = explode(',',$arr[1])[0];
    $rf = explode(',',$arr[1])[1];
    $rh = explode(',',$arr[1])[2];
    $t  = explode(',',$arr[1])[3];
    $wd = explode(',',$arr[1])[4];
    $ws = explode(',',$arr[1])[5];
    $values.="('$utc','$ev','$rf','$rh','$t','$wd','$ws'),";
}
$values = rtrim($values,',');
$sql = "insert into data (utc,ev,rf,rh,t,wd,ws) values $values";
$res = mysqli_query($con,$sql);
if ($res){
    echo "<script>alert('Imported to the database successfully!')</script>";
}else{
    echo "<script>alert('Failed to import to the database!')</script>";

}

