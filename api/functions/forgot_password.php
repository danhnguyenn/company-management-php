<?php
// Kiểm tra nếu người dùng gửi yêu cầu quên mật khẩu
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Đọc dữ liệu JSON từ client
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Kiểm tra nếu email tồn tại trong dữ liệu JSON
    if (!isset($data['email']) || empty($data['email'])) {
        echo json_encode(["status" => "error", "message" => "Email không hợp lệ."]);
        exit;
    }

    $email = $data['email'];

    // Kết nối tới cơ sở dữ liệu (sử dụng PDO như đã trình bày trước đó)
    require_once '../config.php';
    $database = new Database();
    $conn = $database->connect();

    // Kiểm tra email trong cơ sở dữ liệu
    $stmt = $conn->prepare("SELECT user_id, email FROM Users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Tạo mã OTP ngẫu nhiên
        $otp = rand(100000, 999999);

        //Lưu mã OTP vào cơ sở dữ liệu
        $updateStmt = $conn->prepare("UPDATE Users SET otp = :otp WHERE user_id = :user_id");
        $updateStmt->bindParam(':otp', $otp);
        $updateStmt->bindParam(':user_id', $user['user_id']);
        $updateStmt->execute();

        // Gửi OTP qua email
        $subject = 'Mã OTP khôi phục mật khẩu';
        $message = 'Mã OTP của bạn là: ' . $otp;
        $headers = 'From: your-email@gmail.com' . "\r\n" .
                   'Reply-To: your-email@gmail.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        // Gửi email
        if (mail($user['email'], $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Mã OTP đã được gửi đến email của bạn."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Không thể gửi email."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Email không tồn tại trong hệ thống."]);
    }

    // Đóng kết nối
    $database->close();
}
?>