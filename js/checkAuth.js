function checkAuth() {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "/public/login.html";
  }
}

export { checkAuth };
