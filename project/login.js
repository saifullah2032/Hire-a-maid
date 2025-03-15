// Get the elements
const roleSelect = document.getElementById("role");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitButton = document.querySelector("button");
const errorMessage = document.getElementById("error-message");

// Event listener for role selection
roleSelect.addEventListener("change", function () {
    if (roleSelect.value) {
        usernameInput.disabled = false;
        passwordInput.disabled = false;
        submitButton.disabled = false;
    } else {
        usernameInput.disabled = true;
        passwordInput.disabled = true;
        submitButton.disabled = true;
    }
});

// Form submission logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;

    // Reset the error message
    errorMessage.textContent = "";

    // Simple validation
    if (username === "" || password === "" || role === "") {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    // Admin login validation
    if (role === "admin") {
        if (username === "admin@example.com" && password === "admin@123") {
            alert("Logged in as Admin");
            window.location.href = "admin/admin-dashboard.html"; // Redirect to Admin Dashboard
        } else {
            alert("Error: Invalid admin credentials.");
        }
        return;
    }

    // Default user login logic
    if (role === "user") {
        alert("Logged in as User");
        window.location.href = "home.html"; // Redirect to Home Page
    } else {
        alert("Error: Invalid role selected.");
    }
});
