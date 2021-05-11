function deleteRow() {
    var form = document.getElementById('updateForm');
    var username = document.getElementById('username').value.trim();
    var panelname = document.getElementById('panelname').value.trim();
    var dataname = document.getElementById('dataname').value.trim();

    //store username and password
    const data = {
        username: username,
        panelname: panelname,
        dataname: dataname
    };

    //send post json data to url
    fetch('../php/deleteData.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.text())
        .then(data => {
            if (data == 'success') { //if fetch returns success
                //submit form
                form.submit();
            }
            else if (data == 'error') { //if fetch returns invalid
                alert('error - panel was not deleted');
            }
            else {
                alert('error');
            }
        })
        .catch(err => console.log(err)); //catch error

    return false;
}

function validate() {
    var form = document.getElementById('updateForm');
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var oldDataName = document.getElementById('oldDataName').value.trim();
    var panelname = document.getElementById('panelname').value.trim();
    var dataname = document.getElementById('dataname').value.trim();
    var datatype = document.getElementById('datatype').value.trim();
    var nominal = document.getElementById('nominal').value.trim();
    var min = document.getElementById('min').value.trim();
    var max = document.getElementById('max').value.trim();

    if (dataname == '' || dataname == null) {
        alert('dataname is required');
        return false;
    }
    else {
        //store username and password
        const data = {
            username: username,
            password: password,
            oldDataName: oldDataName,
            panelname: panelname,
            dataname: dataname,
            datatype: datatype,
            nominal: nominal,
            min: min,
            max: max
        };

        //send post json data to url
        fetch('../php/updateData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(data => {
                if (data == 'success') { //if fetch returns success
                    //submit form
                    form.submit();
                }
                else if (data == 'error') { //if fetch returns invalid
                    alert('error - dataname must be unique');
                }
                else {
                    alert('error');
                }
            })
            .catch(err => console.log(err)); //catch error

        return false;
    }
}