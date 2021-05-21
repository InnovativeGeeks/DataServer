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
        //get username and password
        var username = getCookie('username');
        var password = getCookie('password');

        //store username and password
        const data = {
            username: username,
            password: password
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
            //display first panel as default
            $("#cardhead").html(json.panels[0]);
            displayPanelData(json.panels[0]);

            json.panels.forEach(element => {
                var div = document.createElement("div");
                div.setAttribute('class', 'card card-body align-items-center btn border-primary mb-2 panel');
                div.setAttribute('id', element);

                div.innerHTML = element;
                $("#panelrows").append(div);

                //change display panels info on click of panel, append to dynamic element
                $("#" + element).on("click", function(e) {
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
    }

    function displayPanelData(panel) {
        var username = getCookie('username');

        //store username and password
        const data = {
            username: username,
            panelname: panel
        };

        //send post json data to url
        fetch('../php/panelData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                $("#cardhead").html(panel);
                var info = document.getElementById("infocard");

                if (info.children.length > 1) {
                    info.removeChild(info.lastChild);
                }

                var ul = document.createElement('ul');
                ul.setAttribute('class', 'list-group list-group-flush');
                data.paneldata.forEach(element => {
                    var li = document.createElement('li');
                    li.setAttribute('class', 'list-group-item');
                    li.innerHTML = "data name: " + element.dataname + "<br/>" +
                        "data type: " + element.datatype + "<br/>" +
                        "current value: " + element.value;
                    ul.append(li);
                });
                info.append(ul);
            })
            .catch(err => console.log(err)); //catch error
    }

})(jQuery);