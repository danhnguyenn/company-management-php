<?php
require_once '../config.php';

$db = new Database();
$conn = $db->connect();

try {
    // Retrieve all users
    $stmt = $conn->query("SELECT user_id, password FROM Users");

    while ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $userId = $user['user_id'];
        $plainPassword = $user['password'];

        // Hash the plain text password
        $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

        // Update the user's password with the hashed version
        $updateStmt = $conn->prepare("UPDATE Users SET password = :password WHERE user_id = :user_id");
        $updateStmt->bindParam(':password', $hashedPassword);
        $updateStmt->bindParam(':user_id', $userId);
        $updateStmt->execute();
    }

    echo "All passwords have been successfully hashed.";
} catch (PDOException $e) {
    echo "Error updating passwords: " . $e->getMessage();
}
?>