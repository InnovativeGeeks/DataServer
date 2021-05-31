/**
 * Created by Ryan Draper
 * 33152216
 */

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
function validateSignup() {
    var username = document.getElementById('inputUsername');
    var password = document.getElementById('inputPassword');
    var conpassword = document.getElementById('inputConfirmPassword');
    var messageField = document.getElementById('message');
    var form = document.getElementById('signupForm');

    if (emptyInput(username.value.trim())) { //check empty username
        //set username field red outline
        username.setAttribute('class', 'form-control py-4 is-invalid');
        password.setAttribute('class', 'form-control py-4');
        conpassword.setAttribute('class', 'form-control py-4');

        //focus username field
		username.focus();

        //set message
        messageField.innerHTML = "username required";
        messageField.hidden = false;

		return false;
	}
	else if (emptyInput(password.value.trim())) { //check empty password
        //set password field red outline
        username.setAttribute('class', 'form-control py-4');
        password.setAttribute('class', 'form-control py-4 is-invalid');
        conpassword.setAttribute('class', 'form-control py-4');

        //focus password field
		password.focus();

        //set message
        messageField.innerHTML = "password required";
        messageField.hidden = false;

		return false;
	}
    else if (emptyInput(conpassword.value.trim())) { //check empty password
        //set confirmpassword field red outline
        username.setAttribute('class', 'form-control py-4');
        password.setAttribute('class', 'form-control py-4');
        conpassword.setAttribute('class', 'form-control py-4 is-invalid');

        //focus confirmpassword field
		conpassword.focus();

        //set message
        messageField.innerHTML = "confirm password required";
        messageField.hidden = false;

		return false;
	}
    else if (doesNotMatch(password.value.trim(), conpassword.value.trim())) {
        //set password and confirmpassword field red outline
        username.setAttribute('class', 'form-control py-4');
        password.setAttribute('class', 'form-control py-4 is-invalid');
        conpassword.setAttribute('class', 'form-control py-4 is-invalid');

        //focus password and confirmpassword field
        password.focus();
		conpassword.focus();

        //set message
        messageField.innerHTML = "passwords do not match";
        messageField.hidden = false;

        return false;
    }
    else if (invalidPassword(password.value.trim())) {
        //set password field red outline
        username.setAttribute('class', 'form-control py-4');
        password.setAttribute('class', 'form-control py-4 is-invalid');
        conpassword.setAttribute('class', 'form-control py-4');

        //focus password field
        password.focus();

        //set message
        messageField.innerHTML = "passwords must be a minimum of 6 characters";
        messageField.hidden = false;

        return false;
    }
    else {
        //store username and password
        const data = {
            username: username.value.trim(),
            password: password.value.trim()
        };

        //send post json data to url
        fetch('../php/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(data => {
                if (data == 'success') { //if fetch returns success
                    //set message outline green. Change message text
                    messageField.setAttribute('class', 'alert alert-success');
                    messageField.innerHTML = "Account Created";
                    messageField.hidden = false;

					//submit form
					form.submit();
                }
                else if (data == 'usertaken') { //if fetch returns usertaken
                    //set username and field red outline
                    username.setAttribute('class', 'form-control py-4 is-invalid');
                    password.setAttribute('class', 'form-control py-4');
                    conpassword.setAttribute('class', 'form-control py-4');

                    //set message outline red. Change message text
                    messageField.setAttribute('class', 'alert alert-danger');
                    messageField.innerHTML = "username taken. Please choose a different username";
                    messageField.hidden = false;
                }
                else {
                    //set username and field red outline
                    username.setAttribute('class', 'form-control py-4 is-invalid');
                    password.setAttribute('class', 'form-control py-4 is-invalid');
                    conpassword.setAttribute('class', 'form-control py-4 is-invalid');

                    //set message outline red. Change message text
                    messageField.setAttribute('class', 'alert alert-danger');
                    messageField.innerHTML = "An error occured";
                    messageField.hidden = false;
                }
            })
            .catch(err => console.log(err)); //catch error

        return false;
    }
}