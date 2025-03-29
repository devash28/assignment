<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Mock database data (Replace with DB query)
$banner = [
    "image" => "http://localhost/assignment/images/banner.jpg",
    "link" => "http://localhost/assignment/promo",
    "alt" => "Special Offer Banner",
    "default_width" => "300px",
    "default_height" => "250px"
];

// Get optional parameters from the request
$width = isset($_GET['width']) ? htmlspecialchars($_GET['width']) : $banner["default_width"];
$height = isset($_GET['height']) ? htmlspecialchars($_GET['height']) : $banner["default_height"];
$position = isset($_GET['position']) ? htmlspecialchars($_GET['position']) : "bottom-right";

// Prepare response
$response = [
    "image" => $banner["image"],
    "link" => $banner["link"],
    "alt" => $banner["alt"],
    "width" => $width,
    "height" => $height,
    "position" => $position
];

echo json_encode($response);
exit;
?>
