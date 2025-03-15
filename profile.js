import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is logged in:", user.uid); // Debugging log

        const userDocRef = doc(db, "users", user.uid);
        try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("User data retrieved:", userData); // Debugging log

                document.getElementById("name").textContent = userData.name || "N/A";
                document.getElementById("age").textContent = userData.age || "N/A";
                document.getElementById("email").textContent = userData.email || "N/A";
            } else {
                console.error("No document found for user.");
                
                
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
            
        }
    } else {
        console.error("No user data found! ");
        
    }
});

// Logout function
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("succesfully Logged out.");
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
});
