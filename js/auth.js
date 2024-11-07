// export function checkAuth() {
//   const user = localStorage.getItem("user");
//   if (!user) {
//       window.location.href = "../public/login.html";
//   }
// }

// Hàm đăng nhập
export async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch("http://localhost/company-management-php/api/functions/auth.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "./index.html"; // Redirect to dashboard
      } else {
          console.error(data.message);
      }
  } catch (error) {
      console.error("Error:", error);
  }
}

// Hàm đăng xuất
export function logout() {
  fetch('http://localhost/company-management-php/api/functions/logout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          localStorage.removeItem("user");
          window.location.href = 'login.html';
      } else {
          console.error(data.message);
      }
  })
  .catch(error => console.error('Error:', error));
}

