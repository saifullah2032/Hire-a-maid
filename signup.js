document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Reset error message
    errorMessage.textContent = "";

    // Validation checks
    if (name === "" || age === "" || email === "" || password === "" || confirmPassword === "") {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    if (isNaN(age) || age < 18) {
        errorMessage.textContent = "You must be at least 18 years old to sign up.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "Enter a valid email address.";
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // If everything is valid, show success alert
    alert("Signup successful! Redirecting to login page.");
    window.location.href = "loginpage.html"; // Redirect to login page
});
