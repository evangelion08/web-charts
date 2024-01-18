<?php

header("Content-Type: application/json");
$connection = new mysqli("localhost", "root", "", "piechart");

if ($connection->connect_error) {
    echo "Failed to connect to MySQL: " . $connection->connect_error;
    exit();
}

$result = $connection->query("SELECT activiteit, kleur, uren FROM activiteiten");
$data = array();
while($row = $result->fetch_assoc())
{
    $data[] = $row;
}

echo json_encode($data);
