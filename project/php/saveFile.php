<?php
//get the data of the posted file
$file = file($_FILES['file']['tmp_name']);

//get full path to save location
$root = $_SERVER['DOCUMENT_ROOT'];
$filename = $_FILES['file']['name'];
$myfile = $root . "/data" . "/" . $filename;

//save the contents of file in the data directory
file_put_contents($myfile, $file);

//get headers from csv
$filen = fopen($myfile, "r");
$filerow = fgetcsv($filen);
fclose($filen);

//get last row of data from csv
$rows = file($myfile);
$last_row = array_pop($rows);
$data = str_getcsv($last_row);

$all = array();
for($i=0; $i<count($filerow); $i++){
    $arr = (object)array();
    $arr->dataname = $filerow[$i];
    $arr->currentval = $data[$i];

    array_push($all, $arr);
}

$json = (object)array();
$json->filename = $filename;
$json->data = $all;
echo json_encode($json);