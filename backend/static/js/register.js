document
  .getElementById("registration-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const csrfToken = getCookie("csrftoken");

    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById("response-message").textContent =
          "User registered successfully!";
      } else {
        document.getElementById("response-message").textContent =
          "Error: " + JSON.stringify(data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      document.getElementById("response-message").textContent =
        "Failed to register user.";
    }
  });

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
