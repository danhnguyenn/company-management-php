<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {
    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);
        $this->setup();
    }

    private function setup() {
        try {
            // Server settings
            $this->mail->SMTPDebug = 0;  // Disable debug output
            $this->mail->isSMTP();      // Send using SMTP
            $this->mail->Host       = 'smtp.gmail.com'; // SMTP server
            $this->mail->SMTPAuth   = true;             // Enable SMTP authentication
            $this->mail->Username   = 'danhntc.fe@gmail.com'; // Your Gmail address
            $this->mail->Password   = 'rehn jszb ngxt ofux';  // Your Gmail app password
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // TLS encryption
            $this->mail->Port       = 465;               // SMTP port for SSL

            // Default sender info
            $this->mail->setFrom('danhntc.fe@gmail.com', 'Your Name');
            $this->mail->addReplyTo('info@example.com', 'Information');
        } catch (Exception $e) {
            echo "Mailer setup failed: " . $e->getMessage();
        }
    }

    public function sendEmail($to, $subject, $body) {
        try {
            // Mã hóa tiêu đề để hỗ trợ tiếng Việt có dấu
            $subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

            // Set recipient
            $this->mail->clearAllRecipients();
            $this->mail->addAddress($to);

            // Content settings
            $this->mail->isHTML(true);  // Set email format to HTML
            $this->mail->Subject = $subject;
            $this->mail->Body    = $body;
            $this->mail->AltBody = strip_tags($body); // Plain-text body

            // Send email
            $this->mail->send();
            return true;  // Email sent successfully
        } catch (Exception $e) {
            return false; // Email sending failed
        }
    }
}
?>