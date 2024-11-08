// export function checkAuth() {
//   const user = localStorage.getItem("user");
//   if (!user) {
//       window.location.href = "../public/login.html";
//   }
// }

const API_ENDPOINT = 'http://localhost/company-management-php/api/functions'

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
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            // Hiển thị thông báo thành công và chuyển hướng
            Swal.fire({
                icon: "success",
                title: "Đăng nhập thành công!",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "./index.html"; // Chuyển hướng tới trang dashboard
            });
        } else {
            // Hiển thị thông báo lỗi khi đăng nhập thất bại
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: data.message || "Đăng nhập không thành công. Vui lòng thử lại.",
                showConfirmButton: true
            });
        }
    } catch (error) {
        // Hiển thị thông báo lỗi nếu có lỗi khi gửi request
        Swal.fire({
            icon: "error",
            title: "Lỗi kết nối",
            text: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
            showConfirmButton: true
        });
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

export async function forgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    // Lấy nút "Xác nhận"
    const confirmButton = document.getElementById('confirm-btn');
        
    // Vô hiệu hóa nút
    confirmButton.disabled = true;
    confirmButton.innerText = 'Đang xử lý...';

    try {
        const res = await fetch(`${API_ENDPOINT}/forgot_password.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });


        if (!res.ok) {
            throw new Error('Failed to send request');
        }

        const data = await res.json();

        if (data.status === "success") {
            Swal.fire({
                //position: "top-center",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            }).then(()=> {
                // Chuyển đến màn hình đổi mật khẩu
                window.location.href = './enter-otp.html';
             });
           
            
        } else {
            Swal.fire({
                //position: "top-center",
                icon: "error",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
}

export async function verifyOTP(event) {
    event.preventDefault();
    const otp = document.getElementById("otp").value;


    try {
        const res = await fetch(`${API_ENDPOINT}/verify_otp.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp })
        });

        const data = await res.json();
        if (data.status === "success") {
            Swal.fire({
                //position: "top-center",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            }).then(()=> {
               // Chuyển đến màn hình đổi mật khẩu
                window.location.href = './reset-password.html';
            });
            
        } else {
            Swal.fire({
                icon: "error",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
};



// Gọi API Reset Password
export async function resetPassword(event) {
    event.preventDefault();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if(newPassword === confirmPassword){
        fetch(`${API_ENDPOINT}/reset_password.php`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({newPassword})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=> {
                    window.location.href='./login.html';
                });
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Mật khẩu không trùng nhau');
    }
}


    

