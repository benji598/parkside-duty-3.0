<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "parkside";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
