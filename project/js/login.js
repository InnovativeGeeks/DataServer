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

//displays a message in the errorMessage element and makes it visible
function display(element, message) {
	element.innerText = message;
	element.hidden = false;
}

//function for checking validation of form inputs
function validate() {
	var username = document.getElementById('username');
	var password = document.getElementById('password');
	var error = document.getElementById('errorMessage');
	var form = document.getElementById('loginForm');

	if (emptyInput(username.value.trim())) {
		//display error message
		display(error, 'Username is required');
		username.focus();
		return false;
	}
	else if (emptyInput(password.value.trim())) {
		//display error message
		display(error, 'Password is required');
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
		fetch('../php/validateLogin.php', {
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
					display(error, 'success');
					//submit form
					form.submit();
				}
				else if (data == 'invalid') { //if fetch returns invalid
					error.setAttribute('name', 'unsuccess');
					display(error, 'Invalid username or password');
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