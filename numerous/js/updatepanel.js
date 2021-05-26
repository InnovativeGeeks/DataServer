/*!
 * Start Bootstrap - SB Admin v6.0.3 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if (this.href === path) {
            $(this).addClass("active");
        }
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });

    /*
        function getCookie
        author: w3Schools.com
        url: https://www.w3schools.com/js/js_cookies.asp
    */
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $(document).ready(function() {
        //get logged in user
        var username = getCookie("username");
        if (username == '') {
            window.location.replace("../html/401.html");
        } else {
            $("#loggedinUser").html(username);
            $("#usernav").html('Hello ' + username);
            loadPanels();
        }
    });

    //logout
    $("#logoutBtn").on("click", function() {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = "password= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        window.location.replace("../login.html");
    });

    //change display panels info on click of panel
    $(".panel").on("click", function(e) {
        var txt = $(e.target).html();
        $("#cardhead").html(txt);
    });

    function loadPanels() {
        //get username
        var username = getCookie('username');

        //store username
        const data = {
            username: username,
        };

        //send post json data to url
        fetch('../php/panels.php', {
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

    function loadPanelData(json) {
        //check if json has array of panel names
        if (Array.isArray(json.panels)) {

            $("#cardhead").html(json.panels[0]['panel_name']);
            displayPanelData(json.panels[0]);

            json.panels.forEach(element => {
                var id = element['panel_id'];
                var div = document.createElement("div");
                div.setAttribute('class', 'card card-body align-items-center btn border-primary mb-2 w-100 panel');
                div.setAttribute('id', id);

                div.innerHTML = element['panel_name'];
                $("#panelrows").append(div);

                //change display panels info on click of panel, append to dynamic element
                $("#" + id).on("click", function(e) {
                    displayPanelData(element);
                });

            });
        } else {
            var panelrows = document.getElementById('panelrows');
            var inforows = document.getElementById('inforows');
            panelrows.setAttribute('hidden', 'true');
            inforows.setAttribute('hidden', 'true');

            var col = document.createElement("div");
            col.setAttribute('class', 'alert alert-primary ');
            col.setAttribute('role', 'alert');
            col.innerHTML = "<strong>" + json.panels + ".</strong> Panels will be displayed once created.";

            var div = document.createElement("div");
            div.setAttribute('class', 'col-md-12');
            div.setAttribute('id', 'noPanelAlert');
            div.append(col);

            $("#panels").append(div);
        }

        function displayPanelData(panel) {
            var username = getCookie('username');
            //store username and password
            const data = {
                username: username,
                panelname: panel['panel_name']
            };

            //send post json data to url
            fetch('../php/updatePanel.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    $("#cardhead").html(panel['panel_name']);
                    var info = document.getElementById("infocard");

                    if (info.children.length > 1) {
                        info.removeChild(info.lastChild);
                    }

                    var ul = document.createElement('ul');
                    ul.setAttribute('class', 'list-group list-group-flush');
                    data.paneldata.forEach(element => {
                        var li = document.createElement('li');
                        li.setAttribute('class', 'list-group-item');
                        li.setAttribute('id', element.panel_id + "_" + element.dataname);
                        li.innerHTML = element.dataname;

                        ul.append(li);
                    });

                    info.append(ul);

                    //add on click for elements
                    data.paneldata.forEach(element => {
                        $("#" + element.panel_id + "_" + element.dataname).on("click", function(e) {
                            updateData(element);
                        });
                    });

                    $("#updatehead").html(data.paneldata[0].dataname);
                    updateData(data.paneldata[0]);
                })
                .catch(err => console.log(err)); //catch error
        }

        function updateData(element) {
            $("#updatehead").html(element.dataname);

            var value = element.value;
            var a = element.a;
            var min = element.min;

            var info = document.getElementById("updatecard");

            //if text
            if (typeof(value) != "undefined") {
                if (info.children.length > 1) {
                    info.removeChild(info.lastChild);
                }

                var ul = document.createElement('ul');
                ul.setAttribute('class', 'list-group list-group-flush');

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
                    "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
                    "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputNominal' class='small mb-1'>Nominal:</label><br/>" +
                    "<input type='text' id='inputNominal' class='form-control py-4' value='" + element.nominal + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputValue' class='small mb-1'>Value:</label><br/>" +
                    "<input type='text' id='inputValue' class='form-control py-4' value='" + element.value + "'/>";
                ul.append(li);

            } else if (typeof(a) != "undefined") { //if sin
                if (info.children.length > 1) {
                    info.removeChild(info.lastChild);
                }

                var ul = document.createElement('ul');
                ul.setAttribute('class', 'list-group list-group-flush');

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
                    "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
                    "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputNominalMin' class='small mb-1'>Nominal Min:</label><br/>" +
                    "<input type='text' id='inputNominalMin' class='form-control py-4' value='" + element.nominal_min + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputNominalMax' class='small mb-1'>Nominal Max:</label><br/>" +
                    "<input type='text' id='inputNominalMax' class='form-control py-4' value='" + element.nominal_max + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputA' class='small mb-1'>A:</label><br/>" +
                    "<input type='text' id='inputA' class='form-control py-4' value='" + element.a + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputB' class='small mb-1'>B:</label><br/>" +
                    "<input type='text' id='inputB' class='form-control py-4' value='" + element.b + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputC' class='small mb-1'>C:</label><br/>" +
                    "<input type='text' id='inputC' class='form-control py-4' value='" + element.c + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputD' class='small mb-1'>D:</label><br/>" +
                    "<input type='text' id='inputD' class='form-control py-4' value='" + element.d + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputI' class='small mb-1'>I:</label><br/>" +
                    "<input type='text' id='inputI' class='form-control py-4' value='" + element.i + "'/>";
                ul.append(li);

            } else if (typeof(min) != "undefined") { //if random
                if (info.children.length > 1) {
                    info.removeChild(info.lastChild);
                }

                var ul = document.createElement('ul');
                ul.setAttribute('class', 'list-group list-group-flush');

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputDataname' class='small mb-1'>Dataname:</label><br/>" +
                    "<input type='text' id='inputDataname' class='form-control py-4' value='" + element.dataname + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputDatatype' class='small mb-1'>Datatype:</label><br/>" +
                    "<input type='text' id='inputDatatype' class='form-control py-4' value='" + element.datatype + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputNominalMin' class='small mb-1'>Nominal Min:</label><br/>" +
                    "<input type='text' id='inputNominalMin' class='form-control py-4' value='" + element.nominal_min + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputNominalMax' class='small mb-1'>Nominal Max:</label><br/>" +
                    "<input type='text' id='inputNominalMax' class='form-control py-4' value='" + element.nominal_max + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputMin' class='small mb-1'>Min:</label><br/>" +
                    "<input type='text' id='inputMin' class='form-control py-4' value='" + element.min + "'/>";
                ul.append(li);

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = "<label for'inputMax' class='small mb-1'>Max:</label><br/>" +
                    "<input type='text' id='inputMax' class='form-control py-4' value='" + element.max + "'/>";
                ul.append(li);


            }

            var li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');
            li.innerHTML = "<input type='button' id='removeBtn' class='btn btn-primary btn-block' value='Remove Stream'/>";
            ul.append(li);

            var li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');
            li.innerHTML = "<input type='button' id='saveBtn' class='btn btn-primary btn-block' value='Save Updates'/>";
            ul.append(li);

            info.append(ul);

            $("#removeBtn").on("click", function() {
                removestream(element);
            });

            $("#saveBtn").on("click", function() {
                if (typeof(value) != "undefined") {
                    var dn = document.getElementById("inputDataname").value.trim();
                    var dt = document.getElementById("inputDatatype").value.trim();
                    var nom = document.getElementById("inputNominal").value.trim();
                    var val = document.getElementById("inputValue").value.trim();
                    streamChangesText(element.panel_id, element.dataname, dn, dt, nom, val);
                }

                if (typeof(a) != "undefined") {
                    var dn = document.getElementById("inputDataname").value.trim();
                    var dt = document.getElementById("inputDatatype").value.trim();
                    var nomMin = document.getElementById("inputNominalMin").value.trim();
                    var nomMax = document.getElementById("inputNominalMax").value.trim();
                    var aa = document.getElementById("inputA").value.trim();
                    var b = document.getElementById("inputB").value.trim();
                    var c = document.getElementById("inputC").value.trim();
                    var d = document.getElementById("inputD").value.trim();
                    var i = document.getElementById("inputI").value.trim();
                    streamChangesSin(element.panel_id, element.dataname, dn, dt, nomMin, nomMax, aa, b, c, d, i);
                }

                if (typeof(min) != "undefined") {
                    var dn = document.getElementById("inputDataname").value.trim();
                    var dt = document.getElementById("inputDatatype").value.trim();
                    var nomMin = document.getElementById("inputNominalMin").value.trim();
                    var nomMax = document.getElementById("inputNominalMax").value.trim();
                    var mmin = document.getElementById("inputMin").value.trim();
                    var max = document.getElementById("inputMax").value.trim();
                    streamChangesRandom(element.panel_id, element.dataname, dn, dt, nomMin, nomMax, mmin, max);
                }
            });
        }
    }

})(jQuery);

function streamChangesText(panel_id, oldDn, newDn, dt, nom, val) {
    var data = {
        panel_id: panel_id,
        oldDataname: oldDn,
        dataname: newDn,
        datatype: dt,
        nominal: nom,
        value: val
    };
    //send post json data to url
    fetch('../php/updateStream.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data == 'updated') {
                window.location.replace('./updatepanel.html');
            }
        })
        .catch(err => console.log(err)); //catch error
}

function streamChangesSin(panel_id, oldDn, newDn, dt, nomMin, nomMax, a, b, c, d, i) {
    var data = {
        panel_id: panel_id,
        oldDataname: oldDn,
        dataname: newDn,
        datatype: dt,
        nominal_min: nomMin,
        nominal_max: nomMax,
        a: a,
        b: b,
        c: c,
        d: d,
        i: i
    };
    //send post json data to url
    fetch('../php/updateStream.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data == 'updated') {
                window.location.replace('./updatepanel.html');
            }
        })
        .catch(err => console.log(err)); //catch error
}

function streamChangesRandom(panel_id, oldDn, newDn, dt, nomMin, nomMax, min, max) {
    var data = {
        panel_id: panel_id,
        oldDataname: oldDn,
        dataname: newDn,
        datatype: dt,
        nominal_min: nomMin,
        nominal_max: nomMax,
        min: min,
        max: max
    };
    //send post json data to url
    fetch('../php/updateStream.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data == 'updated') {
                window.location.replace('./updatepanel.html');
            }
        })
        .catch(err => console.log(err)); //catch error
}

function removestream(element) {
    var data = {
        panel_id: element.panel_id,
        dataname: element.dataname
    };
    //send post json data to url
    fetch('../php/removeStream.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data == 'removed') {
                window.location.replace('./updatepanel.html');
            }
        })
        .catch(err => console.log(err)); //catch error
}