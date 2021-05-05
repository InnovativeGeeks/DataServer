//check if a var is empty
function emptyInput(str) {
    if (str == '' || str == null) {
        return true;
    }

    return false;
}

//check if two vars match
function doesNotMatch(str, str1) {
    if (str !== str1) {
        return true;
    }

    return false;
}

//check if a password is valid length
function invalidPassword(str) {
    if (str.length < 6) {
        return true;
    }

    return false;
}

//displays a message in the errorMessage element and makes it visible
function display(element, message) {
    element.innerText = message;
    element.hidden = false;
}

//function for checking validation of form inputs
function validate() {
    var username = document.getElementById('username');
    var conusername = document.getElementById('conusername');
    var password = document.getElementById('password');
    var conpassword = document.getElementById('conpassword');
    var error = document.getElementById('errorMessage');
    var form = document.getElementById('signupForm');

    if (emptyInput(username.value.trim())) {
        //display error message
        display(error, 'Username is required');
        username.focus();
        return false;
    }
    else if (emptyInput(conusername.value.trim())) {
        //display error message
        display(error, 'Please re-enter username');
        conusername.focus();
        return false;
    }
    else if (doesNotMatch(username.value.trim(), conusername.value.trim())) {
        //display error message
        display(error, 'The usernames do not match');
        username.focus();
        conusername.focus();
        return false;
    }
    else if (emptyInput(password.value.trim())) {
        //display error message
        display(error, 'Password is required');
        password.focus();
        return false;
    }
    else if (emptyInput(conpassword.value.trim())) {
        //display error message
        display(error, 'Please re-enter password');
        conpassword.focus();
        return false;
    }
    else if (doesNotMatch(password.value.trim(), conpassword.value.trim())) {
        //display error message
        display(error, 'The passwords do not match');
        password.focus();
        conpassword.focus();
        return false;
    }
    else if (invalidPassword(password.value.trim())) {
        //display error message
        display(error, 'Password must be a minimum of 6 characters');
        password.focus();
        return false;
    }
    else {
        //store username and password
        const data = {
            username: username.value.trim(),
            password: password.value.trim()
        };

        //send post json data to url
        fetch('../php/validateSignUp.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(data => {
                if (data == 'success') { //if fetch returns success
                    error.setAttribute('name', 'success');
                    display(error, 'Account Created');
                    //submit form
                    form.submit();
                }
                else if (data == 'usertaken') { //if fetch returns usertaken
                    error.setAttribute('name', 'unsuccess');
                    display(error, 'Account not created. Please use a different username');
                }
                else {
                    error.setAttribute('name', 'unsuccess');
                    display(error, 'An error occured. Please try again');
                }
            })
            .catch(err => console.log(err)); //catch error

        return false;
    }
}