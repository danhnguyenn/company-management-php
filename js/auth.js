// export function checkAuth() {
//   const user = localStorage.getItem("user");
//   if (!user) {
//       window.location.href = "../public/login.html";
//   }
// }

const API_ENDPOINT = 'http://localhost/company-management-php/api/functions'

// Hàm đăng nhập
export async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch(`${API_ENDPOINT}/auth.php`, {
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
  fetch(`${API_ENDPOINT}/logout.php`, {
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

// Gọi API Forgot Password
export async function forgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    console.log('email', email );

    try {
        // Gửi yêu cầu đến API với async/await
        const res = await fetch(`${API_ENDPOINT}/forgot_password.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (!res.ok) {
            // Nếu phản hồi không hợp lệ, ném lỗi
            throw new Error('Failed to send request');
        }

        const data = await res.json();

        if (data.status === "success") {
            console.log('Data:', data);
            console.log(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
}


// Gọi API Reset Password
function resetPassword() {
    const otp = document.getElementById("otp").value;
    const newPassword = document.getElementById("new_password").value;

    fetch('reset_password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `otp=${otp}&new_password=${newPassword}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert(data.message);
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

