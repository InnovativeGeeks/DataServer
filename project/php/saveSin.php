<?php
    $js = file_get_contents('php://input');
    $json = json_decode($js, true);

    $dataname = $json['dataname'];
    $currentval = $json['currentval'];
    $filename = $json['filename'];

$all = array();
for($i=0; $i<1; $i++){
    $arr = (object)array();
    $arr->dataname = $dataname;
    $arr->currentval = $currentval;

    array_push($all, $arr);
}

$json = (object)array();
$json->filename = $filename;
$json->data = $all;
echo json_encode($json);