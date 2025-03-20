// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Firebase Configuration (Updated)
const firebaseConfig = {
    apiKey: "AIzaSyDKHHmFhtcMsMj365jMcGGSU5UfoVKT3SY",
    authDomain: "maid-booking-4ec9e.firebaseapp.com",
    databaseURL: "https://maid-booking-4ec9e-default-rtdb.firebaseio.com",
    projectId: "maid-booking-4ec9e",
    storageBucket: "maid-booking-4ec9e.appspot.com", // Fixed storage bucket
    messagingSenderId: "59794486383",
    appId: "1:59794486383:web:a1de68abd7a9da4945099a",
    measurementId: "G-48143C3T7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const maidForm = document.getElementById("maidForm");

    if (!maidForm) {
        console.error("Form not found! Ensure it has the correct ID.");
        return;
    }

    maidForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form values
        const maidId = document.getElementById("maidId").value.trim();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const gender = document.getElementById("gender").value;
        const contactNumber = document.getElementById("contactNumber").value.trim();
        const experience = document.getElementById("experience").value.trim();

        if (!maidId) {
            alert("Maid ID is required!");
            return;
        }

        try {
            // Save data in Firestore (Without Image)
            const maidData = {
                name,
                email,
                gender,
                contactNumber,
                experience,
                timestamp: new Date()
            };

            await setDoc(doc(db, "maid", maidId), maidData);

            alert("Maid details added successfully!");
            maidForm.reset();
        } catch (error) {
            console.error("Error adding maid:", error);
            alert("Failed to add maid!");
        }
    });
});
