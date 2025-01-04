//we parse it in the main array 
var allBookMark = JSON.parse(localStorage.getItem("allBookMarks")) || []
var BookMarkName = document.getElementById("siteNameInput")
var BookMarkURL = document.getElementById("siteURLInput")

displayAllBookMark()

function addBookMark() {
    if (validation() == true) {

        var BookMark = {
            bname: BookMarkName.value,
            burl: BookMarkURL.value,
        }

        allBookMark.push(BookMark)
        //han3ml stringfy abl kol display 
        localStorage.setItem("allBookMarks", JSON.stringify(allBookMark))
        clearDataFromInput()

        displayAllBookMark()


    }
    else {
        var modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
        modal.show();

    }
}

function clearDataFromInput() {
    BookMarkName.value = ''
    BookMarkURL.value = ''
}

function displayAllBookMark() {
    var cartoona = "";
    for (let i = 0; i < allBookMark.length; i++) {
        cartoona = cartoona + `  <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${allBookMark[i].bname}</td>
                            <td>
                                     <a href="https://www.${allBookMark[i].burl}" target="_blank "> <button class="btn btn-light-green"><i
                                    class="fa-solid fa-eye me-2" id="viewbtn"></i>view</button>
                                    </a>

                            </td>
                            <td> <button class="btn btn-dark-red" onClick="deleteBookMark(${i})"><i class="fa-solid fa-trash me-2"></i>Delete</button>
                            </td>
                        </tr> `
        currentIndex = i

    }
    document.getElementById("tableRow").innerHTML = cartoona;
}

function deleteBookMark(i) {
    allBookMark.splice(i, 1)
    localStorage.setItem("allBookMarks", JSON.stringify(allBookMark))
    displayAllBookMark()
}


// Regular expressions for validation
var regexName = /^[a-z\s\w]{3,}$/i;
var regexURL = /^[a-zA-Z0-9\s\-]{3,}\.(com|net|org)$/i;

// Select all right and wrong icons
var rightIcons = document.querySelectorAll(".fa-check");
var wrongIcons = document.querySelectorAll(".fa-circle-xmark");

// Function to validate the input fields
function validation() {
    var isValidName = regexName.test(BookMarkName.value);
    var isValidURL = regexURL.test(BookMarkURL.value);
    return isValidName && isValidURL;
}

// Add event listeners to validate each input field in real time
BookMarkName.addEventListener("input", function () {
    validateField(BookMarkName, regexName, 0); // Index 0 for the first set of icons
});

BookMarkURL.addEventListener("input", function () {
    validateField(BookMarkURL, regexURL, 1); // Index 1 for the second set of icons
});


// Function to validate a single field and apply styles/icons
function validateField(inputField, regex, index) {
    if (regex.test(inputField.value)) {
        applyValidationStyles(inputField, true, index);
    } else {
        applyValidationStyles(inputField, false, index);
    }
}

// Function to apply validation styles and show/hide icons
function applyValidationStyles(inputField, isValid, index) {
    if (isValid) {
        inputField.style.borderColor = "green";
        inputField.style.boxShadow = "0 0 5px 2px rgba(0, 255, 0, 0.5)";
        rightIcons[index].classList.remove("d-none");
        wrongIcons[index].classList.add("d-none");
    } else {
        inputField.style.borderColor = "red";
        inputField.style.boxShadow = "0 0 5px 2px rgba(255, 0, 0, 0.5)";
        rightIcons[index].classList.add("d-none");
        wrongIcons[index].classList.remove("d-none");
    }
}

// Add event listeners for blur to reset styles
BookMarkName.addEventListener("blur", function () {
    resetFieldStyle(BookMarkName, 0); // Pass index 0 for the first input
});

BookMarkURL.addEventListener("blur", function () {
    resetFieldStyle(BookMarkURL, 1); // Pass index 1 for the second input
});

// Function to reset input field styles and icons
function resetFieldStyle(inputField, index) {
    inputField.style.borderColor = "";
    inputField.style.boxShadow = "";

    // Reset icons: show both icons when focus is lost
    rightIcons[index].classList.add("d-none");
    wrongIcons[index].classList.add("d-none");
}
