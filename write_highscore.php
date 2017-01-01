<?php
$file = 'people.txt';
// Open the file to get existing content
$current = file_get_contents($file);

$name = $_GET['name'];
// Append a new person to the file
$current .= $name . "\n";
// Write the contents back to the file
file_put_contents($file, $current);
?>