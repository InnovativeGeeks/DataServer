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


function validateLogin() {
    var messageField = document.getElementById('message');
    var username = document.getElementById('inputUsername');
    var password = document.getElementById('inputPassword');
    var form = document.getElementById('loginForm');

    if (emptyInput(username.value.trim())) { //check empty username
        //set username field red outline
        username.setAttribute('class', 'form-control py-4 is-invalid');
        password.setAttribute('class', 'form-control py-4');

        //focus username field
        username.focus();

        //set message
        messageField.innerHTML = "username required";
        messageField.hidden = false;

        return false;
    } else if (emptyInput(password.value.trim())) { //check empty password
        //set password field red outline
        username.setAttribute('class', 'form-control py-4');
        password.setAttribute('class', 'form-control py-4 is-invalid');

        //focus password field
        password.focus();

        //set message
        messageField.innerHTML = "password required";
        messageField.hidden = false;

        return false;
    } else {
        //store username and password
        const data = {
            username: username.value.trim(),
            password: password.value.trim()
        };

        //send post json data to url
        fetch('../php/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message == 'success') { //if fetch returns success
                    //set cookies
                    document.cookie = "username=" + username.value.trim() + "; path=/";
                    document.cookie = "password=" + password.value.trim() + "; path=/";
                    document.cookie = "role=" + data.role + "; path=/";

                    //set message outline green. Change message text
                    messageField.setAttribute('class', 'alert alert-success');
                    messageField.innerHTML = "success";
                    messageField.hidden = false;

                    //submit form
                    form.submit();
                } else if (data.message == 'invalid') { //if fetch returns invalid
                    //set username and password field red outline
                    username.setAttribute('class', 'form-control py-4 is-invalid');
                    password.setAttribute('class', 'form-control py-4 is-invalid');

                    //set message outline red. Change message text
                    messageField.setAttribute('class', 'alert alert-danger');
                    messageField.innerHTML = "username or password invalid";
                    messageField.hidden = false;
                } else {
                    //set username and password field red outline
                    username.setAttribute('class', 'form-control py-4 is-invalid');
                    password.setAttribute('class', 'form-control py-4 is-invalid');

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