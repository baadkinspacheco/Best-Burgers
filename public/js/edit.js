'use strict';

let burgerList;

// Fetches json objects from url 
async function getData() {
    try{
        const url = '/api/burgers/all';
        const res = await fetch(url);
        let data = await res.json();
        console.log(data);
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

    // Creates a modified array of html strings 
    // The html strings contain different burger names
    const html = data.map(burger => {
        return `<option  value="${burger.name}">${burger.name}</option>`;
    })

    // Add burger options to the div on index.html page
    var options = document.getElementById('selectBurger');
    options.innerHTML = "<p><select class='select' id='selectBurger'>" 
        + html.sort() + "</select></p><br>"; 
    
    // Event listener outside of select drop down
    options.addEventListener('click', (e) => {
        // Provides html form with values saved in database
        // Edits are updated in the database
        showUpdateForm(e.target);
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

// Displays the update form on the edit page
// Pre-fills the values in the form 
function showUpdateForm(selected) {
    let index = getIndexOfBurgerInDataSet(selected);
    const editForm = document.getElementById("updateForm");
    editForm.innerHTML = `<form autocomplete="off" class="frmEditBurger" id="frmEditBurger">
        <div class="container-question">
            <label><b>Name of Burger</b></label>
            <input type="text" id="name" name="name" value="${burgerList[index].name}" readonly>
            <small class="err hidden" id="errName"></small><br>
        </div>
        <div class="container-question">
            <label><b>Restaurant</b></label><br>
            <input type="text" id="restaurant" name="restaurant" value="${burgerList[index].restaurant}" pattern=".{2,}" title="Must contain a valid name" required>
            <small class="err hidden" id="errRest"></small><br>
        </div>
        <div class="container-question">
            <label><b>Website URL</b></label><br>
            <input type="text" id="web" name="web" value="${burgerList[index].web}" pattern="https?://.+" title="Include http://" required>
            <small class="err hidden" id="errWeb"></small><br>
        </div>
        <div class="container-question">
            <label><b>Description</b></label><br>
            <input type="text" id="description" name="description" value="${burgerList[index].description}" pattern=".{2,}" title="Must contain a valid description" required>
            <small class="err hidden" id="errDescription"></small><br>
        </div>
        <div class="container-question">
            <label><b>Ingredients</b></label><br>
            <input type="text" id="ingredients" name="ingredients" value="${burgerList[index].ingredients}" pattern=".{2,}" title="Must be longer than two characters" required>
            <small class="err hidden" id="errIngredients"></small><br>
        </div>
        <div class="container-question">
            <label><b>Address</b></label><br>
            <input type="text" id="address" name="address" value="${burgerList[index].address}" pattern=".{6,}" title="Must be valid address" required>
            <small class="err hidden" id="errAddress"></small><br>
        </div>
        <div class="container-question">
            <label><b>City</b></label><br>
            <input type="text" id="city" name="city" value="${burgerList[index].city}" pattern=".{2,}" title="Must be a valid city" required>
            <small class="err hidden" id="errCity"></small><br>
        </div>
        <div class="container-question">
            <label><b>State</b></label><br>
            <input type="text" id="state" name="state" value="${burgerList[index].state}" pattern=".{2}" title="Must be AZ" required>
            <small class="err hidden" id="errState"></small><br>
        </div>
        <div class="container-question">
            <label><b>Postal Code</b></label><br>
            <input type="text" id="postal" name="postal" value="${burgerList[index].postal}" pattern=".{5,}" title="Must be a valid postal address" required>
            <small class="err hidden" id="errPostal"></small><br>
        </div>
        <div class="container-question">
            <label><b>Country</b></label><br>
            <input type="text" id="country" name="country" value="${burgerList[index].country}" pattern=".{2,}" title="Must be a valid country" required>
            <small class="err hidden" id="errCountry"></small><br>
        </div>
        <button type="submit" value="Submit">Update</button>
    </form>`;

}

// Collects data from the form. If the data is valid
// then a success message appears in the console
frmEditBurger.addEventListener("submit", async (e) => {
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

    if(!validInput(json)) {
       return;
    } 

    // Alert user that data is being added to the database
    alert("Burger has been updated in the database!");
    
    // Print out success message in the console
    console.log("Burger is ready to be updated!");
    console.log(json);

    // Send a post request to the server
    let apiCall = await fetch('/api/burgers/edit', {
        method: 'PUT',
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
