<?php
// Enable CORS for cross-origin requests from the frontend
header("Access-Control-Allow-Origin: *"); // Replace with your frontend URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Clear session data
    session_unset();
    session_destroy();

    echo json_encode([
        "status" => "success",
        "message" => "Logout successful"
    ]);
} else {
    // Method not allowed response
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed."
    ]);
}
?>