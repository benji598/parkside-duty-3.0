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