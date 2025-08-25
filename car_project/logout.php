<?php
session_start();
session_unset();
session_destroy();
header("Location: http://localhost/CAR/index.html"); // Change path if needed
exit();
?>
