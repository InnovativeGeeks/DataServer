<?php
    $sinFunctionValues = json_decode($_POST['sinFunctionValues'], true);
    foreach($sinFunctionValues as $values)
    {
        $a = $values->a;
        $b = $values->b;
        $c = $values->c;
        $d = $values->d;
        $e = $values->e;

        echo($a*sin($bx+$c) + $d);
    }
?>