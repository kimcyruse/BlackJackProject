<?php

$myval = $_POST['variable'];


$file = fopen("leaderboard.txt","a");
echo fwrite($file, $myval);
fclose($file);
?>