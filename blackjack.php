<?php

$myval = $_POST['variable'];


$file = fopen("leaederboard.txt","a");
echo fwrite($file, $myval);
fclose($file);
?>