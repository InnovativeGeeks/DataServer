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
    document.getElementById('panelInfo').appendChild(form);
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
                loadPanelData(data);
            })
            .catch(err => console.log(err)); //catch error
    }
}

function loadPanelData(json) {
    //check if json has array of panel names
    if (Array.isArray(json.panels)) {
        json.panels.forEach(element => {
            var div = document.createElement('div');
            div.setAttribute('id', element);
            div.setAttribute('onclick', 'displayPanelData( "'+element+'" )');
            
            var h = document.createElement("h3");
            h.innerText = element;
            div.appendChild(h);

            document.getElementById('panels').appendChild(div);

            var br = document.createElement("br");
            document.getElementById('panels').appendChild(br);
        });
    }
    else {
        var p = document.createElement("p");
        p.innerText = json.panels;
        document.getElementById('panels').appendChild(p);
    }
}

function displayPanelData(panel) {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

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
            document.getElementById('panelInfo').innerHTML = '';
            changeSelected(panel);
            data.paneldata.forEach(element => {
                var p = document.createElement("p");
                p = document.createElement("p");
                p.innerText = "data name: " + element.dataname + "\n" +
                    "data type: " + element.datatype + "\n" +
                    "nominal min: " + element.nominal_min + "\n" +
                    "nominal max: " + element.nominal_max + "\n" +
                    "current value: " + element.currentval;
                document.getElementById('panelInfo').appendChild(p);
            });

            createForm(user, pass, panel);
        })
        .catch(err => console.log(err)); //catch error
}

function changeSelected(panel){
    var panels = document.getElementById('panels').querySelectorAll('.highlightp');
    if(panels.length != 0){
        panels.forEach(element => {
            element.removeAttribute('class');
        });
    }

    document.getElementById(panel).setAttribute('class', 'highlightp');
}