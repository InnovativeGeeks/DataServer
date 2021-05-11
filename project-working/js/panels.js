/**
 * Created by Ryan Draper
 * 33152216
 */

 function createForm(user, pass, panelname){
    //create form element
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '../php/editPanel.php');
    
    //username element
    var txt = document.createElement('input');
    txt.setAttribute('type', 'text');
    txt.setAttribute('name', 'username');
    txt.setAttribute('value', user);
    txt.setAttribute('hidden', 'true');
    form.appendChild(txt);

    //password element
    var txt = document.createElement('input');
    txt.setAttribute('type', 'text');
    txt.setAttribute('name', 'password');
    txt.setAttribute('value', pass);
    txt.setAttribute('hidden', 'true');
    form.appendChild(txt);    

    //panelname element
    var txt = document.createElement('input');
    txt.setAttribute('type', 'text');
    txt.setAttribute('name', 'panelname');
    txt.setAttribute('value', panelname);
    txt.setAttribute('hidden', 'true');
    form.appendChild(txt); 

    //submit element
    var btn = document.createElement('input');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('value', 'update panel')
    form.appendChild(btn);

    //append form to html
    document.getElementById('panels').appendChild(form);
}

function loadPanels() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    if (user == '' || user == null) {
        //prompt user about signing in
        if (confirm('You are not signed in. Go to login page?')) {
            window.location.replace("../login.html");
        }
    }
    else {
        //store username and password
        const data = {
            username: user,
            password: pass
        };

        //send post json data to url
        fetch('../php/getPanels.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                loadPanelData(data, user, pass);
            })
            .catch(err => console.log(err)); //catch error
    }
}

function loadPanelData(json, user, pass) {
    //check if json has array of panel names
    if (Array.isArray(json.panels)) {
        json.panels.forEach(element => {
            displayPanelData(element, user, pass);
        });
    }
    else {
        var p = document.createElement("p");
        p.innerText = json.panels;
        document.getElementById('panels').appendChild(p);
    }
}

function displayPanelData(panel, user, pass) {
    //store username and password
    const data = {
        username: user,
        password: pass,
        panelname: panel
    };

    //send post json data to url
    fetch('../php/getPanelData.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            var h = document.createElement("h3");
            h.innerText = data.panelname;
            document.getElementById('panels').appendChild(h);

            data.paneldata.forEach(element => {
                var p = document.createElement("p");
                p = document.createElement("p");
                p.innerText = "data name: " + element.dataname + "\n" +
                    "data type: " + element.datatype + "\n" +
                    "nominal values: " + element.nominal + "\n" +
                    "minimum value: " + element.min + "\n" +
                    "maximum value: " + element.max;
                document.getElementById('panels').appendChild(p);
            });

            createForm(user, pass, data.panelname);

            var br = document.createElement("br");
            document.getElementById('panels').appendChild(br);
        })
        .catch(err => console.log(err)); //catch error
}