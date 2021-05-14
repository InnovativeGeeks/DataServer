<?php
//get the data of the posted file
$file = file($_FILES['file']['tmp_name']);

//get full path to save location
$root = $_SERVER['DOCUMENT_ROOT'];
$filename = $_FILES['file']['name'];
$myfile = $root . "/data" . "/" . $filename;

//save the contents of file in the data directory
file_put_contents($myfile, $file);

$fl = fopen($myfile, "r");
$cont = '';
while(!feof($fl)){
    $line = fgets($fl);
    $cont = $cont.$line;
}
fclose($fl);

$all = array();
for($i=0; $i<1; $i++){
    $arr = (object)array();
    $arr->dataname = "file_".$filename;
    $arr->currentval = $cont;

    array_push($all, $arr);
}

$json = (object)array();
$json->filename = $filename;
$json->data = $all;
echo json_encode($json);