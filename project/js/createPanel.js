/**
 * Created by Ryan Draper
 * 33152216
 */

const arr = [];

function validate() {
    var panel = document.getElementById("panelname").value;

    if (panel == '' || panel == null) {
        alert("panel name required");
        return false;
    }
    else {
        var form = document.getElementById('dataform');
        var username = document.getElementById('username');
        var panelname = document.getElementById('panelname');

        if (arr.length == 0) {
            alert('no streams added');
            return false;
        }
        else {
            arr.forEach(element => {
                element['data'].forEach(el => {
                    const data = {
                        username: username.value.trim(),
                        panelname: panelname.value.trim(),
                        dataname: el['dataname'],
                        currentval: el['currentval'],
                        stream: element['filename']
                    };

                    //send post json data to url
                    fetch('../php/savePanel.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.text())
                        .then(dt => console.log(dt))
                        .catch(err => console.log(err));
                });
            });

            form.removeAttribute('action');
            form.removeAttribute('onsubmit');
            form.setAttribute('action', './panels.php');
            return true;
        }
    }
}

function addStream() {
    var streamArea = document.getElementById('stream');

    var type = document.createElement('select');
    type.setAttribute('name', 'selopt');
    type.setAttribute('id', 'selopt');
    type.setAttribute('onchange', 'changeFunc()');

    var opt = document.createElement('option');
    opt.setAttribute('id', 'default');
    opt.innerText = '*select';
    var opt1 = document.createElement('option');
    opt1.setAttribute('id', 'csv');
    opt1.innerText = 'csv';
    var opt2 = document.createElement('option');
    opt2.setAttribute('id', 'txt');
    opt2.innerText = 'text';
    var opt3 = document.createElement('option');
    opt3.setAttribute('id', 'img');
    opt3.innerText = 'image';
    var opt4 = document.createElement('option');
    opt4.setAttribute('id', 'num');
    opt4.innerText = 'numeric';

    type.appendChild(opt);
    type.appendChild(opt1);
    type.appendChild(opt2);
    type.appendChild(opt3);
    type.appendChild(opt4);

    streamArea.appendChild(type);
}

function changeFunc() {
    var choice = document.getElementById('selopt').value;
    var div = document.getElementById('uploadingStream');

    if (choice == 'csv') {
        fetch('../php/upload.php', {
            method: 'get',
            headers: {
                'Content-Type': 'text/html'
            }
        })
            .then(response => response.text())
            .then(data => div.innerHTML = data + "<input type='button' value='save' onclick='savecsv()'/>")
            .catch(err => alert(err));
    }
    if (choice == 'image') {

    }
    if (choice == 'text') {
        fetch('../php/upload.php', {
            method: 'get',
            headers: {
                'Content-Type': 'text/html'
            }
        })
            .then(response => response.text())
            .then(data => div.innerHTML = data + "<input type='button' value='save' onclick='savetxt()'/>")
            .catch(err => alert(err));
    }
    if (choice == 'numeric') {
        fetch('../php/sinFunction.php', {
            method: 'get',
            headers: {
                'Content-Type': 'text/html'
            }
        })
            .then(response => response.text())
            .then(data => div.innerHTML = data + "<input type='button' value='save' onclick='savesin()'/>")
            .catch(err => alert(err));
    }
}

function savecsv() {
    var upfile = document.getElementById('file').files[0];
    var fd = new FormData();
    fd.append('file', upfile);

    var div = document.getElementById('addedstreams');

    fetch('../php/saveFile.php', {
        method: 'post',
        body: fd
    })
        .then(response => response.json())
        .then(data => {
            if (arr.length == 0) {
                arr.push(data);
                div.innerHTML += (data['filename'] + "<br/>");
            }
            else {
                arr.forEach(element => {
                    //check if stream already exists
                    if (element['filename'] == data['filename']) {
                        alert('duplicate');
                    }
                    else {
                        arr.push(data);
                        div.innerHTML += (data['filename'] + "<br/>");
                    }
                });
            }
        })
        .catch(err => alert(err));

    console.log(arr);
}

function savesin() {
    var div = document.getElementById('addedstreams');
    var values = {
        a: document.getElementById('a').value.trim(),
        b: document.getElementById('b').value.trim(),
        c: document.getElementById('c').value.trim(),
        d: document.getElementById('d').value.trim(),
        i: document.getElementById('i').value.trim()
    }

    fetch('../php/sinFunctionProcess.php', {
        method: 'post',
        body: JSON.stringify(values)
    })
    .then(res => res.text())
    .then(data => {
        var values = {
            dataname: document.getElementById('dtn').value.trim(),
            filename: document.getElementById('fn').value.trim(),
            currentval: data
        }
        fetch('../php/saveSin.php', {
            method: 'post',
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                if (arr.length == 0) {
                    arr.push(data);
                    div.innerHTML += (data['filename'] + "<br/>");
                }
                else {
                    arr.forEach(element => {
                        //check if stream already exists
                        if (element['filename'] == data['filename']) {
                            alert('duplicate');
                        }
                        else {
                            arr.push(data);
                            div.innerHTML += (data['filename'] + "<br/>");
                        }
                    });
                }
            })
            .catch(err => alert(err));
    
        console.log(arr);
    })
    .then(err => console.log(err));
}

function savetxt() {
    var upfile = document.getElementById('file').files[0];
    var fd = new FormData();
    fd.append('file', upfile);

    var div = document.getElementById('addedstreams');

    fetch('../php/saveTxtFile.php', {
        method: 'post',
        body: fd
    })
        .then(response => response.json())
        .then(data => {
            if (arr.length == 0) {
                arr.push(data);
                div.innerHTML += (data['filename'] + "<br/>");
            }
            else {
                arr.forEach(element => {
                    //check if stream already exists
                    if (element['filename'] == data['filename']) {
                        alert('duplicate');
                    }
                    else {
                        arr.push(data);
                        div.innerHTML += (data['filename'] + "<br/>");
                    }
                });
            }
        })
        .catch(err => alert(err));

    console.log(arr);
}