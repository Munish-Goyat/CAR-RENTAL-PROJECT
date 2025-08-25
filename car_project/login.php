<?php
session_start();
include("connection.php");

$msg = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $query = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['email'] = $row['email'];
        $_SESSION['username'] = $row['name'];


        if ($row['email'] == 'mishugoyat81@gmail.com') {
            echo "<script>
            window.top.location.href = 'http://localhost/CAR/admin.html';
          </script>";
          exit();          
        } else {
           echo "
            <script>
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', '". $row['name'] ."');
                localStorage.setItem('email', '". $row['email'] ."');
                window.top.location.href = 'http://localhost/CAR/index.html';
            </script>
            ";
            exit();

        }
        exit();
    } else {
        $msg = "Invalid email or password";
        echo "<script>alert('$msg'); window.location.href='login.html';</script>";
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
        <form action="login.php" method="post">
            <h2>Login here</h2>
            <p class="msg"><?php echo $msg; ?></p>
            <div class="form-group">
                <input type="email" name="email" placeholder="Enter your email" class="form-control" require>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Enter your password" class="form-control" require>
            </div>
            <button class=" btn font-weight-bold" name="submit">Login Now</button>
            <p>Don't have an Account? <a href="register.php">Register Now </a></p>
        </form>
    </div>
</div>
</body>
</html>