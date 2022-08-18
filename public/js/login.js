"use strict"

document.getElementById('frmExistingUser').addEventListener("submit", async (e) => {
    // Without this browser will continue to refresh page
    e.preventDefault();

    // e.currentTarget returns form data
    let loginData = new FormData(e.currentTarget);

    // Get inputs
    const json = {};
    for (let element of loginData.entries()) {
        json[element[0]] = element[1].trim();
    }

    try {
        let apiCall = await fetch('/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        let apiJson = await apiCall.json();
        console.log(apiJson);
        if (!apiJson.status) {
            alert("Invalid login :(");
            throw new Error("Invalid login :(");
        } 
        window.location.href = "/home";
    } catch (err) {
        console.log(err.message);
    }

});

document.getElementById('btn-register-page').addEventListener("click", async (e) => {
    // Without this browser will continue to refresh page
    e.preventDefault();

    // Go to register page
    window.location.href = "/register";
});