<?php 
require_once '../config.php';

// Cập nhật mật khẩu khi người dùng nhập mật khẩu mới
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Kiểm tra dữ liệu JSON gửi lên

    $input = file_get_contents("php://input");
    $data = json_decode($input, true); 

    if (isset($data['newPassword'])) {
        $new_password = password_hash($data['newPassword'], PASSWORD_DEFAULT); // Mã hóa mật khẩu mới


        if (isset($_SESSION['user_id'])) {
            $user_id = $_SESSION['user_id'];

            // Kết nối cơ sở dữ liệu
            $database = new Database();
            $conn = $database->connect();

            // Cập nhật mật khẩu mới cho user
            $updateStmt = $conn->prepare("UPDATE Users SET password = :password, otp = NULL WHERE user_id = :user_id");
            $updateStmt->bindParam(':password', $new_password);
            $updateStmt->bindParam(':user_id', $user_id);

            // Kiểm tra kết quả của query
            if ($updateStmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Mật khẩu đã được cập nhật thành công. Vui lòng đăng nhập lại"]);
            } else {
                $errorInfo = $updateStmt->errorInfo();
                echo json_encode(["status" => "error", "message" => "Không thể cập nhật mật khẩu."]);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ"]);
    }
}
?>