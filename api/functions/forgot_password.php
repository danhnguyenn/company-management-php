<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read JSON data from client
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Validate email
    if (!isset($data['email']) || empty($data['email'])) {
        http_response_code(400); // Trạng thái lỗi 400 cho email không hợp lệ
        echo json_encode(["status" => "error", "message" => "Email không hợp lệ."]);
        exit;
    }

    $email = $data['email'];

    // Connect to the database
    require_once '../config.php';
    try {
        $database = new Database();
        $conn = $database->connect();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Không thể kết nối cơ sở dữ liệu: " . $e->getMessage()]);
        exit;
    }

    // Check if email exists in the database
    $stmt = $conn->prepare("SELECT user_id, email FROM Users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Generate a random OTP
        $otp = rand(100000, 999999);

        // Save the OTP in the database
        $updateStmt = $conn->prepare("UPDATE Users SET otp = :otp WHERE user_id = :user_id");
        $updateStmt->bindParam(':otp', $otp);
        $updateStmt->bindParam(':user_id', $user['user_id']);
        $updateStmt->execute();

        // Email details
        $subject = 'Mã OTP khôi phục mật khẩu';
        $body = 'Mã OTP của bạn là: ' .'<b>' . $otp . '</b>';

        // Use the Mailer class
        require_once '../../mail/mailer.php';
        $mailer = new Mailer();

        try {
            if ($mailer->sendEmail($user['email'], $subject, $body)) {
                http_response_code(200);  // Success response code
                echo json_encode(["status" => "success", "message" => "Mã OTP đã được gửi đến email của bạn."]);
            } else {
                http_response_code(500); // Server error if email sending fails
                echo json_encode(["status" => "error", "message" => "Không thể gửi email."]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Lỗi khi gửi email: " . $e->getMessage()]);
        }
    } else {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "Email không tồn tại trong hệ thống."]);
    }
}
?>