// Select the login form
const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");


// Listen for the form submit event
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log('123')

  // Get the email and password from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Send a POST request to the login API
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
      // Display success message
      messageEl.textContent = "Login successful!";
      messageEl.style.color = "green";
      localStorage.setItem("user", JSON.stringify(data.user));

      // Optionally, redirect to a dashboard page
      window.location.href = "./index.html";
    } else {
      // Display error message
      messageEl.textContent = data.message;
      messageEl.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    messageEl.textContent = "Something went wrong. Please try again.";
    messageEl.style.color = "red";
  }
});
