// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKHHmFhtcMsMj365jMcGGSU5UfoVKT3SY",
    authDomain: "maid-booking-4ec9e.firebaseapp.com",
    databaseURL: "https://maid-booking-4ec9e-default-rtdb.firebaseio.com",
    projectId: "maid-booking-4ec9e",
    storageBucket: "maid-booking-4ec9e.appspot.com",
    messagingSenderId: "59794486383",
    appId: "1:59794486383:web:a1de68abd7a9da4945099a",
    measurementId: "G-48143C3T7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

// Select the form
const hiringForm = document.querySelector("form");

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("You must be logged in to submit the form.");
        window.location.href = "loginpage.html"; // Redirect to login page
    }
});

// Add event listener for form submission
hiringForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents page refresh

    // Get the logged-in user
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to submit the form.");
        return;
    }

    // Capture form data
    const formData = {
        userId: user.uid, // Associate form submission with user
        name: document.getElementById("name").value.trim(),
        contact: document.getElementById("contact").value.trim(),
        address: document.getElementById("address").value.trim(),
        gender: document.getElementById("gender").value,
        email: document.getElementById("email").value.trim(),
        service: document.getElementById("service").value,
        shift_from: document.getElementById("shift_from").value,
        shift_to: document.getElementById("shift_to").value,
        start_date: document.getElementById("start_date").value,
        notes: document.getElementById("notes").value.trim() || "No additional notes",
        timestamp: new Date()
    };

    try {
        // Add form data to Firestore
        await addDoc(collection(db, "form-fill"), formData);

        // Show success message
        alert("Form submitted successfully!");

        // Reset the form after submission
        hiringForm.reset();
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again!");
    }
});
