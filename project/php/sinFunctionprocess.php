<?php
    $js = file_get_contents('php://input');
    $json = json_decode($js, true);

    $a = $json['a'];
    $b = $json['b'];
    $c = $json['c'];
    $d = $json['d'];
    $e = $json['i'];

    echo($a*sin(($b*$e)+$c) + $d);
?>