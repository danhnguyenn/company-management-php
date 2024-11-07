import { logout } from "./auth.js";

export function loadHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  const currentUrl = window.location.href; // Lấy URL hiện tại

  const headerHTML = `
        <div class="header__logo">
            <img src="./assets/img/logo.png" alt="Logo Công ty" />
        </div>
        <nav class="header__nav">
            <ul>
                <li><a href="index.html" class="${
                  currentUrl.includes("index.html") ? "active" : ""
                } header__nav__link">Trang chủ</a></li>
                <li><a href="about.html" class="${
                  currentUrl.includes("about.html") ? "active" : ""
                } header__nav__link ">Về chúng tôi</a></li>
                <li><a href="contact.html" class="${
                  currentUrl.includes("contact.html") ? "active" : ""
                } header__nav__link ">Liên hệ</a></li>
                <li><a href="#" id="language-link">Ngôn ngữ</a></li>
                <select name="language" id="language-select">
                    <option value="vi" selected>Tiếng Việt</option>
                    <option value="en">Tiếng Anh</option>
                </select>
                ${
                  user
                    ? `
                    <li class="header__profile dropdown">
                        <div class="header__row">
                            <div class="header__avatar">
                                <img src="${
                                  user.profile_picture ||
                                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                                }" alt="Avatar" />
                            </div>
                            <span class="header__username">${
                              user.role_name
                            }</span>
                        </div>
                        <div class="dropdown-content">
                            <a href="profile.html" class="${
                              currentUrl.includes("profile.html")
                                ? "active"
                                : ""
                            } header__nav__link ">Hồ sơ</a>
                            <a href="#" id="logout-button">Đăng xuất</a>
                        </div>
                    </li>
                `
                    : `<li><a href="login.html" class="${
                        currentUrl.includes("login.html") ? "active" : ""
                      } header__nav__link ">Đăng nhập</a></li>`
                }
            </ul>
        </nav>
    `;

  document.getElementById("header").innerHTML = headerHTML;

  // Gán sự kiện cho nút đăng xuất
  if (user) {
    document.getElementById("logout-button").addEventListener("click", logout);
  }
}
