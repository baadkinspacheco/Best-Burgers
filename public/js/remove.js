'use strict';

let burgerList;

// Fetches json objects from url 
async function getData() {
    try{
        const url = '/api/burgers/all';
        const res = await fetch(url);
        let data = await res.json();
        return data;
    }
    catch (error) {
        console.log("There was an issue getting the data.");
    }
};

// html to options
// options to select
getData().then((data) => {
    burgerList = data;

    // Add number of burgers to the title
    if (document.getElementById('number')) {
        const number = document.getElementById('number');
        number.innerHTML = data.length;
    }

    // Creates a modified array of html strings 
    // The html strings contain different burger names
    const html = data.map(burger => {
        return `<option value="${burger.name}">${burger.name}</option>`;
    })

    // Add burger options to the div on index.html page
    var select = document.getElementById('selectBurger');
    select.innerHTML = "<select id='selectBurger' class='select' id='selectBurger'>" 
        + "<option disabled hidden selected>Select</option>" 
        + html.sort() + "</select><br>";
});

// @returns the index of the burger in the burgerList object
function getIndexOfBurgerInDataSet(selected) {
    let burgerName = selected.options[selected.selectedIndex].value;
    console.log(burgerName);
    for (let index = 0; index < burgerList.length; index++) {
        if (burgerList[index].name == burgerName) {
            return index;
        }
    }
    return null;
}

selectBurgerToRemove.addEventListener('submit', async (e) => {
    // Prevent page from running immeditely
    e.preventDefault();

    // Remove selected burger
    removeBurger(e);
});

// Removes the burger from the db
async function removeBurger(e) {
    // Get index of burger and retrieve name
    let index = getIndexOfBurgerInDataSet(e.target[0]);
    let burgerName = burgerList[index].name;
    // Send a post request to the server to remove burger
    let apiCall = await fetch('/api/burgers/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name": burgerList[index].name})
    });
    // Update the remove page with the new set of burgers

    alert("Successfully deleted!");
}
