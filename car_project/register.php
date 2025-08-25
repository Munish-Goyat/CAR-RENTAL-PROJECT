<?php
include("connection.php");

$msg = '';

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];
    $user_type = $_POST['user_type'];

    // ✅ Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = "Please enter a valid email address!";
    } 
    // ✅ Check password match
    else if ($password != $cpassword) {
        $msg = "Passwords do not match!";
    } 
    else {
        // ✅ Check for existing user
        $check_query = "SELECT * FROM `users` WHERE email = '$email'";
        $check_result = mysqli_query($conn, $check_query);

        if (mysqli_num_rows($check_result) > 0) {
            $msg = "User already exists!";
        } else {
            // ✅ Allow only one admin
            if ($user_type == 'admin') {
                $admin_check = "SELECT * FROM `users` WHERE user_type='admin'";
                $admin_result = mysqli_query($conn, $admin_check);

                if (mysqli_num_rows($admin_result) > 0) {
                    $msg = "Admin already exists!";
                } else {
                    $insert = "INSERT INTO `users`(`name`, `email`, `password`, `user_type`) VALUES ('$name','$email','$password','$user_type')";
                    mysqli_query($conn, $insert);
                    header("location:login.php");
                    exit();
                }
            } else {
                $insert = "INSERT INTO `users`(`name`, `email`, `password`, `user_type`) VALUES ('$name','$email','$password','$user_type')";
                mysqli_query($conn, $insert);
                header("location:login.php");
                exit();
            }
        }
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
</head>
<body>
    <div class="form-container">
    <div class="form">
        <form action="register.php" method="post">
            <h2>Registration</h2>
            <p class="msg"><?php echo $msg; ?></p>
            <div class="form-group">
                <input type="text" name="name" placeholder="Enter your name" class="form-control" require>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Enter your email" class="form-control" require>
            </div>
            <div class="form-group">
                <select name="user_type" id="" class="form-control">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Enter your password" class="form-control" require>
            </div>
            <div class="form-group">
                <input type="password" name="cpassword" placeholder="confirm your password" class="form-control" require>
            </div>
            <button class=" btn font-weight-bold" name="submit">Register Now</button>
            <p>Already have an Account? <a href="login.php">Login Now </a></p>
        </form>
    </div>
    </div>
</body>
</html>