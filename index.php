<?php 

// Router script to handle API requests
if (preg_match('/^\/api\//', $_SERVER['REQUEST_URI'])) {
    require __DIR__ . '/backend.php';
    exit; // Stop further processing
}

include 'header.php'; 
require 'db.php';

if ($isAdmin) {
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
    $fullName = $first_name . ' ' . $last_name;
} else {
    $first_name = "Guest";
    $last_name = "Account";
    $fullName = "";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parkside Duties</title>
</head>

<body>
    <header-info title="Parkside Duties" subtitle="Choose a Duty"></header-info>

    <script>
    // Fetch duty types and dynamically populate the grid-layout
    fetch('/api/duty-types')
        .then(response => response.json())
        .then(dutyTypes => {
            const gridLayout = document.querySelector('grid-layout');
            dutyTypes.forEach(duty => {
                const dutyButton = document.createElement('duty-button');
                dutyButton.setAttribute('action-type', 'link');
                dutyButton.setAttribute('link', `duty.php?id=${duty.id}`);
                dutyButton.setAttribute('title', duty.name);
                dutyButton.setAttribute('subtitle', 'Duty');
                dutyButton.innerHTML =
                    `<auditorium-attendant-icon></auditorium-attendant-icon> ${duty.icon}`;
                gridLayout.appendChild(dutyButton);

                console.log(dutyButton)
            });
        })
        .catch(error => console.error('Error:', error));
    </script>

    <grid-layout></grid-layout>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>