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
        var role = getCookie("role");
        if (username == '') {
            window.location.replace("../html/401.html");
        } else if (role == 1) {
            var manager = document.getElementById("manager");
            manager.removeAttribute('hidden');
            var create = document.getElementById("create");
            create.removeAttribute('hidden');
            var update = document.getElementById("update");
            update.removeAttribute('hidden');
            var add = document.getElementById("add");
            add.removeAttribute('hidden');
            var del = document.getElementById("delete");
            del.removeAttribute('hidden');

            $("#loggedinUser").html(username);
            $("#usernav").html('Hello ' + username);
            loadPanels();
        } else if (role == 2) {
            var create = document.getElementById("create");
            create.removeAttribute('hidden');
            var update = document.getElementById("update");
            update.removeAttribute('hidden');
            var add = document.getElementById("add");
            add.removeAttribute('hidden');
            var del = document.getElementById("delete");
            del.removeAttribute('hidden');

            $("#loggedinUser").html(username);
            $("#usernav").html('Hello ' + username);
            loadPanels();
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
        document.cookie = "role= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        window.location.replace("../login.html");
    });

    //change display panels info on click of panel
    $(".panel").on("click", function(e) {
        var txt = $(e.target).html();
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
        //get username
        var username = getCookie('username');

        //check if json has array of panel names
        if (Array.isArray(json.panels)) {

            json.panels.forEach(element => {
                var id = element['panel_id'];
                var div = document.createElement("div");
                div.setAttribute('class', 'card card-body align-items-center btn border-primary mb-2 panel');
                div.setAttribute('id', id);

                div.innerHTML = element['panel_name'];
                $("#panelrows").append(div);

                //change display panels info on click of panel, append to dynamic element
                $("#" + id).on("click", function(e) {
                    deletePanel(element, username);
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

})(jQuery);

function deletePanel(panel, username) {
    var id = panel['panel_id'];

    var data = {
        username: username,
        panelid: id
    };

    //send post json data to url
    fetch('../php/deletepanel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            if (data == 'deleted\n') {
                alert('Panel Deleted');
                window.location.replace('./panels.html');
            } else {
                alert(data);
            }
        })
        .catch(err => console.log(err)); //catch error
}