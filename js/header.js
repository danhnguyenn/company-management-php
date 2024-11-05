export function loadHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    const headerHTML = `
        <div class="header__logo">
            <img src="./assets/img/logo.png" alt="Logo Công ty" />
        </div>
        <nav class="header__nav">
            <ul>
                <li><a href="index.html">Trang chủ</a></li>
                <li><a href="about.html">Về chúng tôi</a></li>
                <li><a href="contact.html">Liên hệ</a></li>
                <li><a href="#" id="language-link">Ngôn ngữ</a></li>
                <select name="language" id="language-select">
                    <option value="vi" selected>Tiếng Việt</option>
                    <option value="en">Tiếng Anh</option>
                </select>
                ${user ? `
                    <li class="header__profile dropdown">
                        <div class="header__row">
                            <div class="header__avatar">
                                <img src="${user.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}" alt="Avatar" />
                            </div>
                            <span class="header__username">${user.role_name}</span>
                        </div>
                        <div class="dropdown-content">
                            <a href="profile.html">Hồ sơ</a>
                            <a href="#" id="logout-button">Đăng xuất</a>
                        </div>
                    </li>
                ` : `<li><a href="login.html">Đăng nhập</a></li>`}
            </ul>
        </nav>
    `;

    document.getElementById("header").innerHTML = headerHTML;

    // Gán sự kiện cho nút đăng xuất
    if (user) {
        document.getElementById("logout-button").addEventListener("click", logout);
    }
}

// Hàm đăng xuất
function logout() {
    fetch('http://localhost/company-management-php/api/functions/logout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            localStorage.removeItem("user");
            window.location.href = '../public/login.html';
        } else {
            console.error(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
