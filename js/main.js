// Import các chức năng từ các tệp khác
import {  login, forgotPassword } from './auth.js';
import { loadHeader } from './header.js';


loadHeader();

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", login);
}


const forgotForm = document.getElementById("confirm-forgot-form");

if (forgotForm) {
    forgotForm.addEventListener("submit", forgotPassword);
}
