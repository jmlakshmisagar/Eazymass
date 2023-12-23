/*
 * Project Name: Eazymass - Effortless Weight Tracker
 * File: response.js
 * Description: This file contains the main JavaScript code for the project.
 * Designed and Developed by Lakshmisagar J M -------->>>  "https://www.linkedin.com/in/lakshmisagar-jm/.
 */
   


        const scriptURL = 'your_link';
        const form = document.forms['submit-to-google-sheet'];
        const loadingOverlay = document.getElementById('loadingOverlay');

        function submitForm() {
            showLoadingOverlay();

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
            showLoadingOverlay();

                    alert("Response Submitted, Thank you!..");
                    setTimeout(()=>{
                    form.reset();

                    },5000);
                    setTimeout(() => {
                    hideLoadingOverlay();
                }, 5000);
                })
                .catch(error => {
                    hideLoadingOverlay();
                    alert("Sorry, please try again!..");
                    console.error('Error!', error.message);
                });
        }

        function showLoadingOverlay() {
            loadingOverlay.style.display = 'flex';
        }

        function hideLoadingOverlay() {
            loadingOverlay.style.display = 'none';
        }