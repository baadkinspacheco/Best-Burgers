
// This function creates a json object with form data
// Prints json to the console

'use strict';

/*
Collects data from the form. If the data is valid
then a success message appears in the console
*/
frmNewBurger.addEventListener("submit", async (e) => {
    // Without this browser will continue to refresh page
    e.preventDefault();

    // Clear errors when reload page
    clearErrors();

    // e.currentTarget returns form data
    let burgerCur = new FormData(e.currentTarget);

    // Add key, value pairs to json object
    // frmData.entries() iterates over everything inside frmData object
    const json = {};
    for (let element of burgerCur.entries()) {
        json[element[0]] = element[1].trim();
    }

    console.log(json);

    if(!validInput(json)) {
       return;
    } 

    // Alert user that data is being added to the database
    alert("Burger has been added to the database!");
    
    // Print out success message in the console
    console.log("Burger is ready to save!");

    // Send a post request to the server
    let apiCall = await fetch('/api/burgers/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    });
});

/*
Checks if the json data is valid format
@param passes in json object with info about burger
@return false if the data is invalid 
*/
function validInput(j) {
    // Returns false if name is not valid input 
    if (isNameValid(j) == false) {
        return false;
    }
    // Returns false if restaurant name is not valid input 
    if (isRestValid(j) == false) {
        return false;
    }
    // Returns false if url is not valid input 
    if (isWebValid(j) == false) {
        return false;
    }
    // Returns false if description is not valid input 
    if (isDescValid(j) == false) {
        return false;
    }
    // Returns false if the ingredients are not valid input 
    if (isIngredValid(j) == false) {
        return false;
    }
    // Returns false if address is not valid input 
    if (isAddValid(j) == false) {
        return false;
    }
    // Returns false if city is not valid input 
    if (isCityValid(j) == false) {
        return false;
    }
    // Returns false if state is not valid input 
    if (isStateValid(j) == false) {
        return false;
    }
    // Returns false if postal address is not valid input 
    if (isPostalValid(j) == false) {
        return false;
    }
    // Returns false if country is not valid input 
    if (isCountryValid(j) == false) {
        return false;
    }
    return true;
}

// @return false if the name is invalid 
function isNameValid(j) {
    // Must be greater than two characters 
    if (j.name.length < 2) {
        return errorMessage(document.getElementById('errName'), "Invalid name");
    }
    // No more than 255 characters long
    if (j.name.length > 255) {
        return errorMessage(document.getElementById('errName'), "Maximum of 255 characters");
    }
}

// @return false if the restaurant is invalid
function isRestValid(j) {
    // Must be greater than 2 characters 
    if (j.restaurant.length < 2) {
        return errorMessage(document.getElementById('errRest'), "Invalid name!!");
    }
    // No more than 255 characters long
    if (j.restaurant.length > 255) {
        return errorMessage(document.getElementById('errRest'), "Maximum of 255 characters");
    }
}

// @return false if the website address is invalid
function isWebValid(j) {
    // Can't contain spaces 
    if (j.web.includes(' ')) {
        return errorMessage(document.getElementById('errWeb'), "Can not contain spaces!");
    }
    // Must contain http://
    if (!j.web.search('https://http://') == -1) {
        return errorMessage(document.getElementById('errWeb'), "Include http://");
    }
    // Must be greater than 8 characters
    if (j.web.length < 8) {
        return errorMessage(document.getElementById('errWeb'), "Invalid URL");
    }
    // Can't be longer than 255 characters
    if (j.web.length > 255) {
        return errorMessage(document.getElementById('errWeb'), "Maximum of 255 characters");
    }
}

// @return false if the description is invalid 
function isDescValid(j) {
    // Can't be less than 2 characters 
    if (j.description.length < 2) {
        return errorMessage(document.getElementById('errDescription'), "Invalid name!!");
    }
    // Can't be longer than 255 characters
    if (j.description.length > 255) {
        return errorMessage(document.getElementById('errDescription'), "Maximum of 255 characters");
    }
}

// @return false if ingredients are invalid
function isIngredValid(j) {
    // Must be greater than two characters 
    if (j.ingredients.length < 2) {
        return errorMessage(document.getElementById('errIngredients'), "Invalid name!!");
    }
    // Can't be longer than 255 characters
    if (j.ingredients.length > 255) {
        return errorMessage(document.getElementById('errIngredients'), "Maximum of 255 characters");
    }   
}

// @return false if city is invalid
function isCityValid(j) {
    // Must be greater than two characters 
    if (j.city.length < 2) {
        return errorMessage(document.getElementById('errCity'), "Invalid name!!");
    }
    // Can't be longer than 255 characters
    if (j.city.length > 255) {
        return errorMessage(document.getElementById('errCity'), "Maximum of 255 characters");
    }  
}

// @return false if state is invalid
function isStateValid(j) {
    const states = ["AZ", "az", "NM", "nm"];
    // Can only include restaurants in the AZ
    if (!states.includes(j.state)) {
        return errorMessage(document.getElementById('errState'), "Can only include restaurants in the Arizona or New Mexico");
    }
}


// @return false if country is invalid
function isCountryValid(j) {
    const countrys = ["United States", "united states"];
    // Can only include restaurants in the US
    if (!countrys.includes(j.country)) {
        return errorMessage(document.getElementById('errCountry'), "Can only include restaurants in the U.S.");
    }
}

// @return false if address is invalid
function isAddValid(j) {
    // Split the address into an array to validate data
    const addressArray = j.address.split(" ");
    // Address number can only contain integers
    if (!Number.isInteger(parseInt(addressArray[0]))) {
        return errorMessage(document.getElementById('errAddress'), "Include numbers");
    }
    // Must be less than 255 characters
    if (j.address.length > 255) {
        return errorMessage(document.getElementById('errAddress'), "Maximum of 255 characters");
    }
    // Must be greater than two characters long
    if (j.address.length < 2) {
        return errorMessage(document.getElementById('errAddress'), "Invalid name!!");
    }
}

// @return false if postal/area code is invalid 
function isPostalValid(j) {
    // Must include only numbers
    if (!Number.isInteger(parseInt(j.postal))) {
        return errorMessage(document.getElementById('errPostal'), "Include numbers");
    }
    // Can't contain spaces 
    if (j.postal === ' ') {
        return errorMessage(document.getElementById('errPostal'), "Minimum of 1 character");
    }
    // Must be less than 10 characters
    if (j.postal.length > 10) {
        return errorMessage(document.getElementById('errPostal'), "Maximum of 10 characters");
    }
}


/*
This function removes all of the errors from the form
*/
function clearErrors() {
    // Hide error text
    let errors = document.querySelectorAll('.err'); 
    errors.forEach(el => {
        el.textContent = '';
        el.classList.replace('show', 'hidden');
   });

}

/*
This function notifies the user of an error in the input field
@param element is an object
@param message is error message in the form of a string
@return false to show form is incomplete
*/
function errorMessage(element, message) {
    // Show red error message
    element.textContent = message;
    element.classList.replace('hidden', 'show');
    return false;
}




