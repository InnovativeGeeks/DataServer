<?php
    $js = file_get_contents('php://input');
    $json = json_decode($js, true);

    $a = $json['amplitude'];
    $b = $json['horizontalDilation'];
    $c = $json['phaseShift'];
    $d = $json['verticalTranslation'];
    $e = $json['incrementValue'];

    echo($a*sin(($b*$e)+$c) + $d);
?>