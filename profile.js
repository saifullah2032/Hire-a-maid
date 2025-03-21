import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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

                // Fetch user's maid orders
                 // Fetch User Orders
        const q = query(collection(db, "form-fill"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            let ordersHtml = "";
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                ordersHtml += `
                    <tr>
                        <td>${data.service}</td>
                        <td>${data.shift_from}</td>
                        <td>${data.shift_to}</td>
                        <td>${data.start_date}</td>
                        <td>${data.notes}</td>
                    </tr>
                `;
            });
            ordersTable.innerHTML = ordersHtml;
        } else {
            ordersTable.innerHTML = "<tr><td colspan='5'>No orders found.</td></tr>";
        }
            } else {
                console.error("No document found for user.");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    } else {
        console.error("No user data found! ");
        alert("Please log in to view your profile.");
        window.location.href = "loginpage.html"; // Redirect to login if not logged in
    }
});


// Logout function
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Successfully Logged out.");
        window.location.href = "loginpage.html"; // Redirect to login after logout
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
});
