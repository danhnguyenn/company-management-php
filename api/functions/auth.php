<?php
// Enable CORS for cross-origin requests from the frontend
header("Access-Control-Allow-Origin: *"); // Replace with your frontend URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
require_once '../config.php';

$db = new Database();
$conn = $db->connect();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the JSON data from the request body
    $input = json_decode(file_get_contents("php://input"), true);
    $email = trim($input['email']);
    $password = trim($input['password']);

    // Check if email and password are not empty
    if (!empty($email) && !empty($password)) {
        // Prepare SQL query to fetch user
        $stmt = $conn->prepare("SELECT u.user_id, u.email, u.password, u.role_id, r.role_name, u.profile_picture 
                                FROM Users u 
                                LEFT JOIN Roles r ON u.role_id = r.role_id 
                                WHERE u.email = :email 
                                LIMIT 1");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Set session for logged-in user
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role_id'] = $user['role_id'];
            $_SESSION['role_name'] = $user['role_name'];
            $_SESSION['profile_picture'] = $user['profile_picture'];

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => [
                    "user_id" => $user['user_id'],
                    "email" => $user['email'],
                    "role_id" => $user['role_id'],
                    "role_name" => $user['role_name'],
                    "profile_picture" => $user['profile_picture']
                ]
            ]);
        } else {
            // Send error response if login fails
            http_response_code(401);
            echo json_encode([
                "status" => "error",
                "message" => "Invalid email or password."
            ]);
        }
    } else {
        // Send error response if input is invalid
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Email and password are required."
        ]);
    }
} else {
    // Method not allowed response
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed."
    ]);
}
?>