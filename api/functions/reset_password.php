<?php
require_once 'config.php'; // Đảm bảo rằng bạn đã bao gồm lớp Database

// Kiểm tra xem người dùng đã gửi OTP và mật khẩu mới hay chưa
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['otp'], $_POST['new_password'])) {
    $otp = $_POST['otp'];
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT); // Mã hóa mật khẩu mới

    // Kết nối tới cơ sở dữ liệu
    $database = new Database();
    $conn = $database->connect();

    // Truy vấn để kiểm tra mã OTP có hợp lệ không
    $stmt = $conn->prepare("SELECT user_id, otp FROM Users WHERE otp = :otp");
    $stmt->bindParam(':otp', $otp);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Nếu OTP hợp lệ, cập nhật mật khẩu mới
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Cập nhật mật khẩu mới
        $updateStmt = $conn->prepare("UPDATE Users SET password = :password, otp = NULL WHERE user_id = :user_id");
        $updateStmt->bindParam(':password', $new_password);
        $updateStmt->bindParam(':user_id', $user['user_id']);
        $updateStmt->execute();

        echo json_encode(["status" => "success", "message" => "Mật khẩu của bạn đã được cập nhật thành công."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Mã OTP không hợp lệ."]);
    }

    // Đóng kết nối
    $database->close();
}
?>