// header.js

// header.js

function loadHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log('user', user)
  
    const headerHTML = `
      <div class="header__logo">
        <img src="./assets/img/logo.png" alt="Logo Công ty" />
      </div>
      <nav class="header__nav">
        <ul>
          <li><a href="index.html" class="header__nav__link" id="home-link">Trang chủ</a></li>
          <li><a href="about.html" class="header__nav__link" id="about-link">Về chúng tôi</a></li>
          <li><a href="contact.html" class="header__nav__link" id="contact-link">Liên hệ</a></li>
          <li><a href="#" class="header__nav__link" id="language-link">Ngôn ngữ</a></li>
          <select name="language" id="language-select">
            <option value="vi" selected>Tiếng Việt</option>
            <option value="en">Tiếng Anh</option>
          </select>
          ${user ? `
            <li class="header__profile">
             <div class="header__avatar">
                 <img src="${user.profile_picture ? user.profile_picture : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}" alt="Avatar" />
             </div>
              <span class="header__username">${user.role_name}</span>
              <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a>
                  <a href="profile.html" class="header__nav__link">Hồ sơ</a>
                  <a href="#" id="logout-link" class="header__nav__link">Đăng xuất</a>
                </div>
              </div>
            </li>
          ` : `
            <li><a href="login.html" class="header__nav__link" id="login-link">Đăng nhập</a></li>
          `}
        </ul>
      </nav>
    `;
  
    const headerContainer = document.getElementById("header");
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML;
      setActiveMenuItem();
  
      if (user) {
        const logoutLink = document.getElementById("logout-link");
        logoutLink.addEventListener("click", (event) => {
          event.preventDefault();
          localStorage.removeItem("user");
          loadHeader();
        });
      }
    }
  }
  
  function setActiveMenuItem() {
    const currentPage = window.location.pathname.split("/").pop();
    const pageToLinkId = {
      "index.html": "home-link",
      "about.html": "about-link",
      "contact.html": "contact-link",
      "login.html": "login-link"
    };
  
    const activeLinkId = pageToLinkId[currentPage];
    if (activeLinkId) {
      const activeLink = document.getElementById(activeLinkId);
      if (activeLink) {
        activeLink.classList.add("header__nav--primary");
      }
    }
  }
  
document.addEventListener("DOMContentLoaded", loadHeader);  