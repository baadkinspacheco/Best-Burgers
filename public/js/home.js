// js for the home page 

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
        return `<option  value="${burger.name}" selected>${burger.name}</option>`;
    })

    // Add burger options to the div on index.html page
    var options = document.getElementById('selectBurger');
    options.innerHTML = "<p><select class='select' id='selectBurger'>" 
        + html.sort() + "</select></p><br>"; 
    
    // Event listener outside of select drop down
    options.addEventListener('click', (e) => {
        // Need to include an if statement to decide what we do with drop-down
        if(document.getElementById('info')) {
            showInfo(e.target);
        }
    });
});

// @returns the index of the burger in the burgerList object
function getIndexOfBurgerInDataSet(selected) {
    let burgerName = selected.options[selected.selectedIndex].text;
    console.log(burgerName);
    for (let index = 0; index < burgerList.length; index++) {
        if (burgerList[index].name == burgerName) {
            return index;
        }
    }
    return null;
}

// Shows the description of each burger
function showInfo(selected) {
    let indexOfBurger =  getIndexOfBurgerInDataSet(selected);
    // Add info about the burger for the user
    var info = document.getElementById('info');
    info.innerHTML = `<p><b>Restaurant:</b><br>${burgerList[indexOfBurger].restaurant}</p>
        <p><b>Location:</b><br>${burgerList[indexOfBurger].address}<br>
        ${burgerList[indexOfBurger].city}, ${burgerList[indexOfBurger].state} ${burgerList[indexOfBurger].postal}<br>
        ${burgerList[indexOfBurger].country}</p>
        <p><b>Website:</b><br>${burgerList[indexOfBurger].web}</p>
        <p><b>Description:</b><br>${burgerList[indexOfBurger].description}</p>
        <p><b>Ingredients:</b><br>${burgerList[indexOfBurger].ingredients}</p>`;

}




