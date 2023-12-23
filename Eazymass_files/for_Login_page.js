   
/*
 * Project Name: Eazymass - Effortless Weight Tracker
 * File: login.js
 * Description: This file contains the main JavaScript code for the project.
 * Designed and Developed by Lakshmisagar J M -------->>>  "https://www.linkedin.com/in/lakshmisagar-jm/.
 */
   

        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
        import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "your-auth-domain.firebaseapp.com",
            projectId: "your-project-id",
            storageBucket: "your-storage-bucket.appspot.com",
            messagingSenderId: "your-messaging-sender-id",
            appId: "your-app-id"
        };
    
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const auth = getAuth();
    
        document.getElementById('Login').addEventListener('click', (e) => {
            var email = document.getElementById('inputEmailOrUserID').value;
            var password = document.getElementById('passwordEntry').value;
    
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const date = new Date();
                    update(ref(database, 'users/' + user.uid), {
                        last_login: date,
                    });
    
                    const uid = user.uid;
    
                    window.location.href = 'inputPage.html?uid=' + uid;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        });
    
        const trackButton = document.getElementById('track');
        trackButton.addEventListener('click', function () {
            const user = auth.currentUser;
    
            if (user) {
                const date = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: date,
                });
    
                window.location.href = 'trackMain.html?uid=' + user.uid;
            } else {
                alert("User not signed in.");
            }
        });