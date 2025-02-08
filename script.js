// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Verify Student ID
async function verifyID() {
    const inputID = document.getElementById("studentId").value.trim();
    const result = document.getElementById("result");

    if (!inputID) {
        result.textContent = "❌ Please enter a Student ID.";
        result.style.color = "red";
        return;
    }

    const docRef = doc(db, "students", inputID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        result.textContent = `✅ Verified! Student: ${docSnap.data().name}`;
        result.style.color = "green";
        generateQRCode(inputID);
    } else {
        result.textContent = "❌ Invalid Student ID!";
        result.style.color = "red";
    }
}

// QR Code Generation
function generateQRCode(studentID) {
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: `https://yourwebsite.com/verify?studentId=${studentID}`,
        width: 128,
        height: 128
    });
}
