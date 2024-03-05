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

<body>
    <?php
    $result = $conn->query("SELECT * FROM duty_type");
    ?>

    <header-info title="Parkside Duties" subtitle="Choose a Duty"></header-info>

    <button id="fetchData">Fetch Data</button>
    <div id="data"></div>

    <script>
        document.getElementById('fetchData').addEventListener('click', function() {
            fetch('/api/data')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('data').innerText = JSON.stringify(data, null, 2);
                })
                .catch(error => console.error('Error:', error));
        });
    </script>

    <grid-layout>
        <?php while($row = $result->fetch_assoc()): ?>
        <duty-button action-type="link" link="duty.php?id=<?php echo htmlspecialchars($row['id']); ?>"
            title="<?php echo htmlspecialchars($row['name']); ?>" subtitle="Duty"
            icon="<auditorium-attendant-icon></auditorium-attendant-icon> <?php echo htmlspecialchars($row['icon']); ?>">
        </duty-button>
        <?php endwhile; ?>
    </grid-layout>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>
