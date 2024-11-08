// Import các chức năng từ các tệp khác
import { login, forgotPassword, verifyOTP,resetPassword } from "./auth.js";
import { loadHeader } from "./header.js";

loadHeader();

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", login);
}

const forgotForm = document.getElementById("confirm-forgot-form");

if (forgotForm) {
  forgotForm.addEventListener("submit", forgotPassword);
}

const otpForm = document.getElementById("otp-form");

if (otpForm) {
  otpForm.addEventListener("submit", verifyOTP);
}


const resetPasswordForm = document.getElementById("reset-password-form");

if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", resetPassword);
}

