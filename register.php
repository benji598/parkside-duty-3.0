<!DOCTYPE html>
<html>
<head>
    <title>Park Side Duty 2.0 - Register</title>
    <link rel="stylesheet" type="text/css" href="css/splash.css">
</head>
<body>
    <div class="splash-container">
        <h2>Park Side Duty 2.0</h2>
        
        <!-- The action here should point to the PHP script that will handle the registration logic -->
        <form action="handle_register.php" method="post">
            <input type="text" name="first_name" placeholder="First Name" required>
            <input type="text" name="last_name" placeholder="Last Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="text" name="phone" placeholder="Phone Number" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="password" name="confirm_password" placeholder="Confirm Password" required>
            <button type="submit" name="register">Register</button>
        </form>
        
        <button onclick="location.href='splash.php'">Back to Login</button>
    </div>
</body>
</html>
