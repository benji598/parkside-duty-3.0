<!-- -->


<?php
// Check the current URL
$currentDomain = $_SERVER['HTTP_HOST'];

// Set the database credentials based on the URL
if ($currentDomain == 'staging.parkside.congregation.uk') {
    $servername = "localhost.staging.parkside.congregation.uk";
    $username = "parksidecong";
    $password = "ParksideCong1931";
    $dbname = "parkside";
} else {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "parkside";
}

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>