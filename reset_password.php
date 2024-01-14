<?php
require 'db.php';

$message = '';
$showResetForm = false;

function validatePassword($password) {
    if (strlen($password) < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!preg_match('/[A-Z]/', $password)) {
        return "Password must include at least one uppercase letter.";
    }
    return "";
}

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Check if the token exists and has not expired
    $stmt = $conn->prepare("SELECT id FROM users WHERE reset_token = ? AND token_expires > ?");
    $currentTime = time();
    $stmt->bind_param("si", $token, $currentTime);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $showResetForm = true;
    } else {
        $message = "Invalid or expired token.";
    }

    $stmt->close();
}

// Check if the password reset form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['password']) && $showResetForm) {
    $passwordError = validatePassword($_POST['password']);

    if ($passwordError == "") {
        $newPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $updateStmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, token_expires = NULL WHERE reset_token = ?");
        $updateStmt->bind_param("ss", $newPassword, $token);
        if ($updateStmt->execute()) {
            $message = "Your password has been updated successfully.";
            header("location: splash.php?m=Your password has been updated successfully.");
        } else {
            $message = "Failed to update the password.";
        }
        $updateStmt->close();
    } else {
        $message = $passwordError;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
</head>
<body>
    <?php if ($showResetForm): ?>
        <form action="reset_password.php?token=<?= htmlspecialchars($token) ?>" method="post">
            Enter your new password: <input type="password" name="password" id="password">
            <input type="submit" value="Reset Password">
        </form>
    <?php endif; ?>

    <?php if (!empty($message)): ?>
        <p><?= $message ?></p>
    <?php endif; ?>
</body>
</html>