// Import các chức năng từ các tệp khác
import {  login } from './auth.js';
import { loadHeader } from './header.js';


loadHeader();

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", login);
}

