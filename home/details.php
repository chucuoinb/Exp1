
<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product</title>
    <link rel="stylesheet" type="text/css" href="../css/css_main.css">
    <link rel="stylesheet" type="text/css" href="../css/css_product_view.css">
    <link rel="stylesheet" type="text/css" href="../css/cloud-zoom.css">
    <script src="../js/jquery-3.2.0.js"></script>
    <script src="../js/cloud-zoom.1.0.2.min.js"></script>
    <script src="../js/jquery.cookie.js"></script>
    <link rel="stylesheet" type="text/css" href="../font-awesome-4.7.0/css/font-awesome.min.css">
    <script src="../js/js_main.js"></script>
    <script src="../js/datetime.js"></script>
</head>
<body>
<div class="wrapper">
    <?php
    include("../include/inc_header.php");
    include("../include/inc_product_view.php");
    include("../include/inc_footer.php");
    ?>
</div>
</body>
</html>