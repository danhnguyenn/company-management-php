// Import các chức năng từ các tệp khác
import {  login } from './auth.js';
import { loadHeader } from './header.js';


// Tải tiêu đề (header)
loadHeader();

// Gọi hàm đăng nhập nếu cần thiết (có thể gọi trong sự kiện form)
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", login);
}

