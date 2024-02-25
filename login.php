<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'db.php';


// Add a debug message to indicate the script has started
// echo "Login script started.<br>";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // echo "Form submitted.<br>";

    // Assign variables
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Prepare and bind
    if ($stmt = $conn->prepare("SELECT id, first_name, last_name, email, phone, password FROM users WHERE email = ?")) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        // echo "Error preparing statement: " . $conn->error . "<br>";
    }
    
    // Check if user exists
    if ($result && $result->num_rows > 0) {
        // echo "User found.<br>";

        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // echo "Password verified.<br>";

            // Password is correct, store the user data in the session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['phone'] = $user['phone'];
            $_SESSION['loggedin'] = true;
            
            // Redirect to index.php
            if (isset($_SESSION['login_error'])) {
                $_SESSION['login_error'] = "";
            }
            
            // echo "Redirecting to index.php<br>";
            // Note: The actual redirect won't work with echo statements in place
            header("location: index.php");
            exit;
        } else {
            // echo "Invalid password.<br>";
            $_SESSION['login_error'] = "Invalid Password.";
            // Note: The actual redirect won't work with echo statements in place
            header("location: splash.php?e=1");
            exit; 
        }
    } else {
        // echo "User not found.<br>";
        $_SESSION['login_error'] = "Invalid Email.";
        // Note: The actual redirect won't work with echo statements in place
        header("location: splash.php?e=1");
        exit; 
    }

    $stmt->close();
} else {
    echo "Form not submitted.<br>";
}

$conn->close();
?>
