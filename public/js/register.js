"use strict"

document.getElementById('frmNewUser').addEventListener("submit", async (e) => {
    // Without this browser will continue to refresh page
    e.preventDefault();

    // e.currentTarget returns form data
    let loginData = new FormData(e.currentTarget);

    // Get inputs
    const json = {};
    for (let element of loginData.entries()) {
        json[element[0]] = element[1].trim();
    }
    console.log(json);

    try {
        // Throws an error if the passwords do not match
        let pass = document.getElementById('password').value;
        let confrmPass = document.getElementById('confrmPassword').value;
        console.log(pass);
        console.log(confrmPass);
        console.log(pass != confrmPass);
        if (pass != confrmPass) {
            alert("Password does not match.")
            throw new Error("Passwords do not match.")
        }

        let apiCall = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        let apiJson = await apiCall.json();
        if (!apiJson.status) {
            alert("Invalid login. Username must contain 6 or more characters.");
            throw new Error("Invalid username or password :(");
        } 
        // After user is added take them back to login page
        window.location.href = "/login";
    } catch (err) {
        console.log(err.message);
    }

});

document.getElementById('btn-login-page').addEventListener("click", async (e) => {
    // Without this browser will continue to refresh page
    e.preventDefault();

    // Go to register page
    window.location.href = "/login";
});