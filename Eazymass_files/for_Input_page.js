
/*
 * Project Name: Eazymass - Effortless Weight Tracker
 * File: input.js
 * Description: This file contains the main JavaScript code for the project.
 * Designed and Developed by Lakshmisagar J M -------->>>  "https://www.linkedin.com/in/lakshmisagar-jm/.
 */
   

        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, get, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        const storingduid = new URLSearchParams(window.location.search);
        const retriveuid = urlParams.get('uid');
        localStorage.setItem("uid :", uid);
                const storedUID = localStorage.getItem("uid");

                if (storedUID) {
                    console.log("Stored UID:", storedUID);
                } else {
                    console.log("UID not found in localStorage");
                }
        if (uid) {
            const userRef = ref(database, 'users/' + uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    if ('username' in userData) {
                        const userNameElement = document.getElementById('userName');
                        userNameElement.textContent = 'Hello, ' + userData.username;
                        const submitButton = document.getElementById('submit');
                        submitButton.addEventListener('click', function () {
                                const inputNumber = document.getElementById('inputNumber').value;
                                const inputdate = document.getElementById('inputdate').value;
                                if (!inputNumber || !inputdate) {
                                    alert('Please fill in all fields.');
                                    return;
                                }
                                alert('Data Submitted Successfully!');                       
                                const submissionsRef = ref(database, 'users/' + uid + '/submissions');
                                push(submissionsRef, {
                                    weigh_date: inputdate,
                                    weight: inputNumber
                                })
                                .then(() => {
                                        document.getElementById('inputNumber').value = '';
                                        document.getElementById('inputdate').value = '';
                                        window.location.href = 'inputPage.html?uid=' + uid;
                                    })
                                .catch((error) => {
                                    console.error('Error storing data:', error.message);
                                });
                            });
                    } else {
                        console.log('User data does not contain a "username" field.');
                    }
                } else {
                    console.log('User data not found.');
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error.message);
            });
        } else {
            console.log('UID not found in the query parameter.');
        }
    });