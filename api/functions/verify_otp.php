<?php
require_once '../config.php'; // Đảm bảo rằng bạn đã bao gồm lớp Database

session_start();

// Kiểm tra nếu có yêu cầu POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (isset($data['otp'])) {
        $otp = $data['otp'];

        // Kết nối cơ sở dữ liệu
        $database = new Database();
        $conn = $database->connect();

        // Kiểm tra OTP trong cơ sở dữ liệu
        $stmt = $conn->prepare("SELECT user_id, otp FROM Users WHERE otp = :otp");
        $stmt->bindParam(':otp', $otp);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Lưu user_id vào session
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION['user_id'] = $user['user_id'];
            http_response_code(200); 
            echo json_encode(["status" => "success", "message" => "OTP hợp lệ."]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Mã OTP không hợp lệ."]);
        }
    }
}
?>