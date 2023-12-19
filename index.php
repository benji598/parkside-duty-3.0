<?php include 'header.php'; 

require 'db.php';

$first_name = $_SESSION['first_name'];
$last_name = $_SESSION['last_name'];

?>
<!DOCTYPE html>
<html lang="en">

  <body>

  <header-info>
      <div slot="title-slot">Dashboard</div>
      <div slot="subtitle-slot">
        
      Welcome, <?php echo htmlspecialchars($first_name) . ' ' . htmlspecialchars($last_name); ?>.
      </div>
      
    </header-info>

    <main class="container overflow">
      <div class="hp-btn-container">
          <?php
                $result = $conn->query("SELECT * FROM duty_type");
          ?>

          <main class="container overflow">
              <div class="hp-btn-container">
              <?php while($row = $result->fetch_assoc()): ?>
                  <duty-button link="duty.php?id=<?php echo htmlspecialchars($row['id']); ?>">
                      <circle-icon-btn icon="<?php echo htmlspecialchars($row['icon']); ?>" slot="icon-slot"></circle-icon-btn>
                      <?php echo htmlspecialchars($row['name']); ?>
                  </duty-button>
              <?php endwhile; ?>
              </div>
          </main>
      </div>
    </main>
    <nav-bar></nav-bar>
  </body>
</html>
