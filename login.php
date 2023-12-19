<?php
require 'db.php';
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assign variables
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, first_name, last_name, email, phone, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Check if user exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Password is correct, store the user data in the session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['phone'] = $user['phone'];
            $_SESSION['loggedin'] = true;
            
            // Redirect to index.php
            header("location: index.php");
            exit;
        } else {
            // Password is not valid
            $_SESSION['login_error'] = "Invalid email or password.";
            header("location: splash.php");
            exit; 
        }
    } else {
        // Email not found
        $_SESSION['login_error'] = "Invalid email or password.";
        header("location: splash.php");
        exit; 
    }

    $stmt->close();
}

$conn->close();
?>
