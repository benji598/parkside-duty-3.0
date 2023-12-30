<?php include 'header.php'; 
  require 'db.php';
    if ($isAdmin) {
      $first_name = $_SESSION['first_name'];
      $last_name = $_SESSION['last_name'];
      $fullName = $first_name . ' ' . $last_name;
    }

    else{
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
    <!-- admin see only -->
    <?php if ($isAdmin) { ?>
    <header-info title="Dashboard" subtitle="Welcome, <?php echo $fullName; ?>"></header-info>
    <?php } ?>

    <grid-layout>
        <?php while($row = $result->fetch_assoc()): ?>
        <duty-button link="duty.php?id=<?php echo htmlspecialchars($row['id']); ?>"
            title="<?php echo htmlspecialchars($row['name']); ?>" subtitle="Duty"
            icon="<auditorium-attendant-icon></auditorium-attendant-icon> <?php echo htmlspecialchars($row['icon']); ?>">
        </duty-button>
        <?php endwhile; ?>
    </grid-layout>

    <nav-bar></nav-bar>
</body>

</html>