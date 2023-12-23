 /*
 * Project Name: Eazymass - Effortless Weight Tracker
 * File: dataForTrack.js
 * Description: This file contains the main JavaScript code for the project.
 * Designed and Developed by Lakshmisagar J M -------->>>  "https://www.linkedin.com/in/lakshmisagar-jm/.
 */
   
 
 
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

        document.addEventListener('DOMContentLoaded', function () {
            const trackButton = document.getElementById('trackChart');

            trackButton.addEventListener('click', function () {
                const urlParams = new URLSearchParams(window.location.search);
                const uid = urlParams.get('uid');

                const selectedOption = document.getElementById('numDays');
                const selectedDays = selectedOption.value;

                window.location.href = `track.html?uid=${uid}&days=${selectedDays}`;
            });

            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            const userRef = ref(database, 'users/' + uid);

            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();

                        const userNameElement = document.getElementById('userName');
                        userNameElement.textContent = 'Hello, ' + (userData.username);

                        console.log('User Data:', userData);
                        alert("here " + userData);
                       
                    } else {
                        console.log('User data not found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error.message);
                });
        });