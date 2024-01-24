<?php

include 'header.php'; 
require 'db.php';  // Ensure this points to your database connection file

// Redirect to splash.php if the user isn't logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
}

// Fetch all duty types from the database
$result_duty_types = $conn->query("SELECT * FROM duty_type");

// Fetch all sub users and their duty assignments from the database
$result_sub_users = $conn->query("
    SELECT su.id, su.firstname, su.lastname, su.phone, GROUP_CONCAT(dt.name ORDER BY dt.name ASC SEPARATOR ', ') AS duties,
    GROUP_CONCAT(dt.id ORDER BY dt.name ASC SEPARATOR ',') AS duty_ids
    FROM sub_users su
    LEFT JOIN sub_user_duty_assignment suda ON su.id = suda.sub_user_id
    LEFT JOIN duty_type dt ON suda.duty_id = dt.id
    GROUP BY su.id
");

// Fetch duty message and cover message from core_config_data
$query_messages = "SELECT name, setting_1 FROM core_config_data WHERE name IN ('duty_message', 'cover_message')";
$result_messages = $conn->query($query_messages);
$messages = [];
while ($row = $result_messages->fetch_assoc()) {
    $messages[$row['name']] = $row['setting_1'];
}

$duty_message = isset($messages['duty_message']) ? $messages['duty_message'] : '';
$cover_message = isset($messages['cover_message']) ? $messages['cover_message'] : '';

$query_meetings = "SELECT name, setting_1 FROM core_config_data WHERE name IN ('meeting_1', 'meeting_2')";
$result_meetings = $conn->query($query_meetings);
$meetings = [];
while ($row = $result_meetings->fetch_assoc()) {
    $meetings[$row['name']] = $row['setting_1'];
}

$meeting_1 = isset($meetings['meeting_1']) ? $meetings['meeting_1'] : '';
$meeting_2 = isset($meetings['meeting_2']) ? $meetings['meeting_2'] : '';

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- ... [Other head elements] ... -->
    <link rel="stylesheet" href="/css/admin.css" rel="prefetch" />
    <!-- ... -->
</head>

<body>

    <header-info title="Admin" subtitle=""></header-info>

    <!-- admin see only -->
    <?php if ($isAdmin) { ?>
    <welcome-message name="<?php echo $fullName; ?>"></welcome-message>
    <?php } ?>

    <div>
        <grid-layout>

            <!-- <form-container title="Add Person" icon="<add-person-icon></add-person-icon>"
                form="<add-person-form></add-person-form>"></form-container>

            <form-container title="Edit Messages" icon="<edit-message-icon></edit-message-icon>"
                form="<duty-message-form></duty-message-form>"></form-container>

            <form-container title="Manage Duties" icon="<manage-duties-icon></manage-duties-icon>"
                form="<manage-duty-form></manage-duty-form>"></form-container>

            <form-container title="Meeting Days" icon="<meeting-days-icon></meeting-days-icon>"
                form="<meeting-day-form></meeting-day-form>"></form-container> -->

            <admin-button title="Add Person" icon="<add-person-icon></add-person-icon>" modal-content="
                <form-container 
                    title='Add Person' 
                    icon='<add-person-icon></add-person-icon>' 
                    form='<add-person-form></add-person-form>'>
                </form-container>">
            </admin-button>

            <admin-button title="Edit Messages" icon="<edit-message-icon></edit-message-icon>" modal-content="
                <form-container 
                    title='Edit Messages' 
                    icon='<edit-message-icon></edit-message-icon>' 
                    form='<duty-message-form></duty-message-form>'>
                </form-container>">
            </admin-button>

            <admin-button title="Manage Duties" icon="<manage-duties-icon></manage-duties-icon>" modal-content="
                <form-container 
                    title='Manage Duties' 
                    icon='<manage-duties-icon></manage-duties-icon>' 
                    form='<manage-duty-form></manage-duty-form>'>
                </form-container>">
            </admin-button>

            <admin-button title="Meeting Days" icon="<meeting-days-icon></meeting-days-icon>" modal-content="
                <form-container 
                    title='Meeting Days' 
                    icon='<meeting-days-icon></meeting-days-icon>' 
                    form='<meeting-day-form></meeting-day-form>'>
                </form-container>">
            </admin-button>
        </grid-layout>
    </div>

    <main class="container overflow">




        <!-- Manage Sub Users Section -->
        <div class="account-container">
            <h2>Manage Sub Users</h2>
            <!-- Table for displaying existing sub users -->
            <table>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Assigned Duties</th>
                    <th>Actions</th>
                </tr>
                <?php while ($row = $result_sub_users->fetch_assoc()): ?>
                <?php
            $duties = explode(', ', $row['duties']);
            $duty_ids = explode(',', $row['duty_ids']);
            ?>
                <tr id="user-row-<?php echo $row['id']; ?>">
                    <td><?php echo htmlspecialchars($row['id']); ?></td>
                    <td>
                        <span class="user-data"><?php echo htmlspecialchars($row['firstname']); ?></span>
                        <input type="text" name="firstname" class="edit-field firstname"
                            value="<?php echo htmlspecialchars($row['firstname']); ?>" style="display: none;">
                    </td>
                    <td>
                        <span class="user-data"><?php echo htmlspecialchars($row['lastname']); ?></span>
                        <input type="text" name="lastname" class="edit-field lastname"
                            value="<?php echo htmlspecialchars($row['lastname']); ?>" style="display: none;">
                    </td>
                    <td>
                        <span class="user-data"><?php echo htmlspecialchars($row['phone']); ?></span>
                        <input type="tel" class="edit-field" value="<?php echo htmlspecialchars($row['phone']); ?>"
                            style="display: none;">
                    </td>
                    <td>
                        <div class="user-data">
                            <?php foreach ($duties as $duty): ?>
                            <span class="tag"><?php echo htmlspecialchars($duty); ?></span>
                            <?php endforeach; ?>
                        </div>

                        <select class="edit-field" multiple style="display: none;">
                            <?php foreach ($result_duty_types as $duty_type): ?>
                            <option value="<?php echo htmlspecialchars($duty_type['id']); ?>"
                                <?php if (in_array($duty_type['id'], $duty_ids)): ?> selected <?php endif; ?>>
                                <?php echo htmlspecialchars($duty_type['name']); ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                    <td>
                        <button type="button" onclick="toggleEdit(<?php echo $row['id']; ?>)">Edit</button>
                        <button type="button" class="save-btn" onclick="saveEdit(<?php echo $row['id']; ?>)"
                            style="display: none;">Save</button>
                        <button type="button" class="delete-btn"
                            onclick="deleteSubUser(<?php echo $row['id']; ?>)">Delete</button>
                    </td>
                </tr>
                <?php endwhile; ?>
            </table>
        </div>

        <script>
        function toggleEdit(userId) {
            var editFields = document.querySelectorAll('#user-row-' + userId + ' .edit-field');
            var userData = document.querySelectorAll('#user-row-' + userId + ' .user-data');
            var saveBtn = document.querySelector('#user-row-' + userId + ' .save-btn');

            console.log(userId);

            editFields.forEach(function(field) {
                field.style.display = field.style.display === 'none' ? '' : 'none';
            });
            userData.forEach(function(data) {
                data.style.display = data.style.display === 'none' ? '' : 'none';
            });
            saveBtn.style.display = saveBtn.style.display === 'none' ? '' : 'none';
        }

        function saveEdit(userId) {
            var firstname = document.querySelector('#user-row-' + userId + ' .firstname').value;
            var lastname = document.querySelector('#user-row-' + userId + ' .lastname').value;



            var phone = document.querySelector('#user-row-' + userId + ' input[type="tel"]').value;
            var selectedDuties = Array.from(document.querySelector('#user-row-' + userId + ' select').selectedOptions)
                .map(option => option.value);


            // Perform AJAX request to save changes
            fetch('save_sub_user.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + userId + '&firstname=' + firstname + '&lastname=' + lastname + '&phone=' + phone +
                        '&duties=' + JSON.stringify(selectedDuties)
                })
                .then(function(response) {
                    return response.text();
                })
                .then(function(text) {

                    // Refresh the page, potentially with a reference to the edited user
                    window.location.href = 'admin.php?edited=' + userId;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        }

        function deleteSubUser(subUserId) {
            if (confirm('Are you sure you want to delete this sub-user?')) {
                fetch('delete_sub_user.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: 'id=' + subUserId
                    })
                    .then(response => response.text())
                    .then(text => {
                        // Refresh the page or remove the row from the table
                        window.location.href = 'admin.php?edited=1';
                    })
                    .catch(error => console.error('Error:', error));
            }
        }
        </script>




    </main>
    <nav-bar></nav-bar>
</body>

<script>
window.onload = function() {
    // Get URL parameters
    var params = new URLSearchParams(window.location.search);
    var editedUserId = params.get('edited');

    if (editedUserId) {
        if (editedUserId === '99999') {
            // Scroll to the last entry in the table
            var rows = document.querySelectorAll('.account-container table tr');
            if (rows.length > 0) {
                var lastRow = rows[rows.length - 1];
                lastRow.scrollIntoView();
            }
        } else {
            // Scroll to the specific edited row
            var editedElement = document.getElementById('user-row-' + editedUserId);
            if (editedElement) {
                editedElement.scrollIntoView();
            }
        }
    }
};
</script>



</html>