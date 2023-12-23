 
 
 /*
 * Project Name: Eazymass - Effortless Weight Tracker
 * File: track.js
 * Description: This file contains the main JavaScript code for the project.
 * Designed and Developed by Lakshmisagar J M -------->>>  "https://www.linkedin.com/in/lakshmisagar-jm/.
 */
    
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
        import 'https://cdn.jsdelivr.net/npm/chart.js/dist/Chart.min.js';
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

        document.addEventListener('DOMContentLoaded', async function() {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            const days = urlParams.get('days');

            console.log('UID:', uid);
            console.log('Days:', days);

            const userRef = ref(database, 'users/' + uid);

            try {
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    console.log('User Data:', userData);

                        const submissionRef = ref(database, 'users/' + uid + '/submissions');

                        const submissionSnapshot = await get(submissionRef);

                        if (submissionSnapshot.exists()) {
                            const allSubmissions = submissionSnapshot.val();

                            const selectedSubmissions = {};
                            const today = new Date();

                            Object.keys(allSubmissions).forEach(submissionId => {
                                const submissionDate = new Date(allSubmissions[submissionId].weigh_date);
                                const differenceInDays = Math.floor((today - submissionDate) / (1000 * 60 * 60 * 24));

                                if (differenceInDays <= days) {
                                    selectedSubmissions[submissionId] = allSubmissions[submissionId];
                                }
                            });

                            console.log('Selected Submissions:', selectedSubmissions);

                            const chartData = {
                                labels: Object.keys(selectedSubmissions).map(submissionId => selectedSubmissions[submissionId].weigh_date),
                                datasets: [{
                                    label: 'Weight',
                                    data: Object.values(selectedSubmissions).map(submission => parseFloat(submission.weight)),
                                    borderColor: 'rgb(56, 56, 255)',
                                    borderWidth: 2,
                                    fill: false,
                                }],
                            };

                            const chartCanvas = document.getElementById('weightChart');

                            new Chart(chartCanvas, {
                                type: 'line',
                                data: chartData,
                                options: {
                                    scales: {
                                        x: {
                                            type: 'linear',
                                            position: 'bottom',
                                        },
                                        y: {
                                            type: 'linear',
                                            position: 'left',
                                        },
                                    },
                                },
                            });

                            // Update the actual weight
                            const latestSubmissionId = Object.keys(selectedSubmissions)[0];
                            const latestWeight = selectedSubmissions[latestSubmissionId].weight;
                            const actualWeightElement = document.getElementById('actualWeight');
                            actualWeightElement.textContent = latestWeight + ' kg';

                            // Update this week's weight
                            const lastSubmissionId = Object.keys(selectedSubmissions).pop();
                            const lastWeight = selectedSubmissions[lastSubmissionId].weight;
                            const thisWeekElement = document.getElementById('thisWeek');
                            thisWeekElement.textContent = lastWeight + ' kg';

                            // Calculate and update the difference in weights
                            const difference = parseFloat(lastWeight) - parseFloat(latestWeight);
                            const totalGainLossElement = document.getElementById('totalGainLoss');
                            totalGainLossElement.textContent = (difference >= 0 ? '+' : '') + difference.toFixed(1) + ' kg';
                        } else {
                            console.log('Submissions data not found.');
                        }
                } else {
                    console.log('User data not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        });
                const logoutButton = document.getElementById('logout');
                logoutButton.addEventListener('click', () => {
                window.location.href = 'index.html';
                 });