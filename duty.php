<?php

require 'db.php';
require 'functions.php';
include 'header.php'; 

// Get the duty ID from the URL parameter
$duty_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Handle delete request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    $sub_user_id = $_POST['sub_user_id'] ?? null;
    if ($sub_user_id && deleteSubUserFromDuty($conn, $sub_user_id, $duty_id)) {
        // Deletion was successful
    
    }
}

// Fetch duty details from the database using the ID
$stmt = $conn->prepare("SELECT * FROM duty_type WHERE id = ?");
$stmt->bind_param("i", $duty_id);
$stmt->execute();
$result_duty = $stmt->get_result();
$duty = $result_duty->fetch_assoc();

// If no duty found, redirect to index or show an error
if (!$duty) {
    header('Location: index.php');
    exit;
}

// Fetch sub-users assigned to this duty
$stmt = $conn->prepare("
    SELECT su.id as sub_user_id, su.firstname, su.lastname, su.phone 
    FROM sub_user_duty_assignment as suda
    JOIN sub_users as su ON suda.sub_user_id = su.id
    WHERE suda.duty_id = ?
");
$stmt->bind_param("i", $duty_id);
$stmt->execute();
$result_sub_users = $stmt->get_result();

// Duty name for the title
$duty_name = $duty['name'];
$stmt->close();
?>



<!-- <!DOCTYPE html>
<html lang="en"> -->

<!-- <head>
    <title><?php echo htmlspecialchars($duty_name); ?> - Park Side</title>
    <script>
    // Confirm deletion with JavaScript before submitting the form
    function confirmDeletion() {
        return confirm('Are you sure you want to remove this user from the duty?');
    }
    </script>
</head> -->

<body>

    <header-info title="<?php echo htmlspecialchars($duty_name); ?>" subtitle="Choose a Duty"></header-info>


    <name-list-layout>
        <?php while ($sub_user = $result_sub_users->fetch_assoc()): ?>
        <name-holder name="
                <?php echo htmlspecialchars($sub_user['firstname']); ?> 
                <?php echo htmlspecialchars($sub_user['lastname']); ?>">
        </name-holder>
        <send-button firstName="<?php echo htmlspecialchars($sub_user['firstname']); ?>"
            lastName="<?php echo htmlspecialchars($sub_user['lastname']); ?>"
            dutyName="<?php echo htmlspecialchars($duty_name); ?>"
            number="<?php echo htmlspecialchars($sub_user['phone']); ?>" icon="<send-icon></send-icon>">
        </send-button>

        <?php endwhile; ?>
    </name-list-layout>



    <!-- admin see only -->
    <?php if ($isAdmin) { ?>
    <?php } ?>


    <!-- old code -->

    <!-- <main class="container overflow">
    <div class="hp-btn-container"> -->
    <!--  <table>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <?php if ($isAdmin) { ?> <th>Actions</th> <?php } ?>
        </tr>
        <?php while ($sub_user = $result_sub_users->fetch_assoc()): ?>
                <tr>
                    <td><?php echo htmlspecialchars($sub_user['firstname']); ?></td>
                    <td><?php echo htmlspecialchars($sub_user['lastname']); ?></td>
                    <td><?php echo htmlspecialchars($sub_user['phone']); ?></td> -->

    <!-- delete button -->
    <!-- <?php if ($isAdmin) { ?> <td>
                        <form method="post" onsubmit="return confirm('Are you sure?');">
                            <input type="hidden" name="sub_user_id" value="<?php echo $sub_user['sub_user_id']; ?>">
                            <input type="hidden" name="duty_id" value="<?php echo $duty_id; ?>">
                             <button type="submit" class="delete-button" name="delete">Delete</button>     
                        </form>
                    </td> <?php } ?> 
        </tr>
        <?php endwhile; ?>
    </table>
    </div>-->
    <!-- </main> -->

    <filtered-data></filtered-data>
    <slideup-modal content="<send-options></send-options>"></slideup-modal>
    <nav-bar></nav-bar>
</body>

</html>