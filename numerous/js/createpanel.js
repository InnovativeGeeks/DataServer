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
        }
    });

    //logout
    $("#logoutBtn").on("click", function() {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = "password= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        window.location.replace("../login.html");
    });

    $("#addBtn").on("click", function() {
        addStream();
    });

    $("#createForm").on("submit", function(event) {
        event.preventDefault();

        var username = getCookie("username");
        var valid = validate();

        if (valid) {

            var form = document.getElementById("createForm");
            var streamcount = form.querySelectorAll('.stream').length;
            var panelname = document.getElementById('inputPanelname').value.trim();
            var streams = [];

            for (i = 1; i < streamcount + 1; i++) {
                var dn = document.getElementById('inputDataname_' + i).value.trim();
                var dt = document.getElementById('inputDatatype_' + i).value;

                if (dt == 'text') {
                    var value = document.getElementById('inputValue_' + i).value.trim();
                    var nominal = document.getElementById('inputNominal_' + i).value.trim();
                    streams.push(text(dn, value, nominal));
                } else if (dt == 'numeric') {
                    var num = document.getElementById('inputFunction_' + i).value;
                    if (num == 'sin') {
                        var a = document.getElementById('inputa_' + i).value.trim();
                        var b = document.getElementById('inputb_' + i).value.trim();
                        var c = document.getElementById('inputc_' + i).value.trim();
                        var d = document.getElementById('inputd_' + i).value.trim();
                        var inc = document.getElementById('inputi_' + i).value.trim();
                        var nominal_min = document.getElementById('inputSNominalMin_' + i).value.trim();
                        var nominal_max = document.getElementById('inputSNominalMax_' + i).value.trim();

                        streams.push(sin(dn, a, b, c, d, inc, nominal_min, nominal_max));
                    } else if (num == 'random') {
                        var min = document.getElementById('inputmin_' + i).value.trim();
                        var max = document.getElementById('inputmax_' + i).value.trim();
                        var nominal_min = document.getElementById('inputRNominalMin_' + i).value.trim();
                        var nominal_max = document.getElementById('inputRNominalMax_' + i).value.trim();

                        streams.push(random(dn, min, max, nominal_min, nominal_max));
                    }
                } else if (dt == 'text upload') {
                    var upfile = document.getElementById('inputTextUpload_' + i).files[0];
                    var fd = new FormData();
                    fd.append('file', upfile);
                    //send post json data to url
                    fetch('../php/saveText.php', {
                            method: 'POST',
                            body: fd,
                        })
                        .then(response => response.json())
                        .then(data => {
                            var value = data['currentval'];
                            streams.push(text(dn, value));
                        })
                        .catch(err => console.log(err)); //catch error
                } else if (dt == 'numeric upload') {
                    var upfile = document.getElementById('inputNumericUpload_' + i).files[0];
                    var fd = new FormData();
                    fd.append('file', upfile);
                    //send post json data to url
                    fetch('../php/saveText.php', {
                            method: 'POST',
                            body: fd,
                        })
                        .then(response => response.json())
                        .then(data => {
                            var value = data['currentval'];
                            streams.push(text(dn, value));
                        })
                        .catch(err => console.log(err)); //catch error
                }
            }

            var data = {
                    username: username,
                    panelname: panelname,
                    streams: streams
                }
                //send post json data to url
            fetch('../php/createPanel.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(data => {
                    if (data == 'panel created successfully') {
                        alert(data);
                        window.location.replace("./panels.html");
                    } else {
                        alert(data);
                    }
                })
                .catch(err => console.log(err)); //catch error
        }
    });

    function addStream() {
        var form = document.getElementById("createForm");

        //get number of stream fields in form
        var streams = form.querySelectorAll('.stream').length + 1;

        //Stream title
        var streamtitle = document.createElement('label');
        streamtitle.setAttribute("class", 'medium stream');
        streamtitle.innerHTML = "<strong>Stream " + streams + "</strong>";

        var row = document.createElement('div');
        row.setAttribute('class', 'row mt-4 mb-1 group_' + streams);
        var col = document.createElement('div');
        col.setAttribute('class', 'col-lg-12');
        var hr = document.createElement('hr');
        col.append(hr);
        var col1 = document.createElement('div');
        col1.setAttribute('class', 'col');
        col1.append(streamtitle);
        row.append(col);
        row.append(col1);
        form.append(row);

        //create dataname field
        var div1 = document.createElement("div");
        div1.setAttribute("class", "form-group group_" + streams);
        var lable1 = document.createElement("label");
        lable1.setAttribute("class", "small mb-1");
        lable1.setAttribute("for", "inputDataname_" + streams);
        lable1.innerText = "Dataname";
        var input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", "inputDataname_" + streams);
        input.setAttribute("placeholder", "Enter dataname");
        input.setAttribute("name", "inputDataname_" + streams);
        div1.append(lable1);
        div1.append(input);

        //create datatype field
        var div2 = document.createElement("div");
        div2.setAttribute("class", "form-group mt-4 group_" + streams);
        var lable2 = document.createElement("label");
        lable2.setAttribute("class", "small mb-1");
        lable2.setAttribute("for", "inputDatatype_" + streams);
        lable2.innerText = "Datatype";
        var select = document.createElement("select");
        select.setAttribute("class", "form-control text-muted");
        select.setAttribute("id", "inputDatatype_" + streams);
        select.setAttribute("name", "inputDatatype_" + streams);
        var optdef = document.createElement("option");
        optdef.setAttribute("selected", "true");
        optdef.innerText = "Select a datatype";
        var opt1 = document.createElement("option");
        opt1.setAttribute("value", "text");
        opt1.innerText = "Text";
        var opt2 = document.createElement("option");
        opt2.setAttribute("value", "numeric");
        opt2.innerText = "Numeric";
        var opt3 = document.createElement("option");
        opt3.setAttribute("value", "text upload");
        opt3.innerText = "Text Upload";
        var opt4 = document.createElement("option");
        opt4.setAttribute("value", "numeric upload");
        opt4.innerText = "Numeric Upload";
        select.append(optdef);
        select.append(opt1);
        select.append(opt2);
        select.append(opt3);
        select.append(opt4);
        div2.append(lable2);
        div2.append(select);

        //append fields to form
        form.append(div1);
        form.append(div2);

        //On datatype change
        $("#inputDatatype_" + streams).on("change", function() {
            var dt = document.getElementById("inputDatatype_" + streams).value;

            //get number of stream fields in form
            var vals = form.querySelectorAll("#inputValue_" + streams).length;
            var funcs = form.querySelectorAll("#inputFunction_" + streams).length;
            var sin = form.querySelectorAll("#inputa_" + streams).length;
            var rand = form.querySelectorAll("#inputmin_" + streams).length;
            var txtup = form.querySelectorAll("#inputTextUpload_" + streams).length;
            var numup = form.querySelectorAll("#inputNumericUpload_" + streams).length;

            if (dt == 'text') {
                //if value field is not already in form
                if (vals == 0) {
                    if (funcs == 1) {
                        document.getElementById("inputFunction_" + streams).parentNode.remove();
                    }
                    if (rand == 1) {
                        document.getElementById("inputmin_" + streams).parentNode.remove();
                    }
                    if (sin == 1) {
                        document.getElementById("inputa_" + streams).parentNode.remove();
                    }
                    if (txtup == 1) {
                        document.getElementById("inputTextUpload_" + streams).parentNode.remove();
                    }
                    if (numup == 1) {
                        document.getElementById("inputNumericUpload_" + streams).parentNode.remove();
                    }

                    //create value field
                    var div3 = document.createElement("div");
                    div3.setAttribute("class", "form-group mt-4 group_" + streams);
                    var lable2 = document.createElement("label");
                    lable2.setAttribute("class", "small mb-1");
                    lable2.setAttribute("for", "inputValue_" + streams);
                    lable2.innerText = "Value";
                    var input1 = document.createElement("input");
                    input1.setAttribute("class", "form-control");
                    input1.setAttribute("id", "inputValue_" + streams);
                    input1.setAttribute("placeholder", "Enter value");
                    input1.setAttribute("name", "inputValue_" + streams);

                    var lable3 = document.createElement("label");
                    lable3.setAttribute("class", "small mb-1");
                    lable3.setAttribute("for", "inputNominal_" + streams);
                    lable3.innerText = "Nominal";
                    var input2 = document.createElement("input");
                    input2.setAttribute("class", "form-control");
                    input2.setAttribute("id", "inputNominal_" + streams);
                    input2.setAttribute("placeholder", "Enter nominal");
                    input2.setAttribute("name", "inputNominal_" + streams);
                    div3.append(lable2);
                    div3.append(input1);
                    div3.append(lable3);
                    div3.append(input2);

                    //append after datatype
                    var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
                    form.insertBefore(div3, posparent.nextSibling);
                }
            } else if (dt == 'numeric') {
                if (funcs == 0) {
                    if (vals == 1) {
                        document.getElementById("inputValue_" + streams).parentNode.remove();
                    }
                    if (txtup == 1) {
                        document.getElementById("inputTextUpload_" + streams).parentNode.remove();
                    }
                    if (numup == 1) {
                        document.getElementById("inputNumericUpload_" + streams).parentNode.remove();
                    }

                    //create datatype field
                    var div4 = document.createElement("div");
                    div4.setAttribute("class", "form-group mt-4 group_" + streams);
                    var lable3 = document.createElement("label");
                    lable3.setAttribute("class", "small mb-1");
                    lable3.setAttribute("for", "inputFunction_" + streams);
                    lable3.innerText = "Function";
                    var select1 = document.createElement("select");
                    select1.setAttribute("class", "form-control text-muted");
                    select1.setAttribute("id", "inputFunction_" + streams);
                    select1.setAttribute("name", "inputFunction_" + streams);
                    var optdef1 = document.createElement("option");
                    optdef1.setAttribute("selected", "true");
                    optdef1.innerText = "Select a function";
                    var opt11 = document.createElement("option");
                    opt11.setAttribute("value", "sin");
                    opt11.innerText = "Sin";
                    var opt21 = document.createElement("option");
                    opt21.setAttribute("value", "random");
                    opt21.innerText = "Random";
                    select1.append(optdef1);
                    select1.append(opt11);
                    select1.append(opt21);
                    div4.append(lable3);
                    div4.append(select1);

                    //append after datatype
                    var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
                    form.insertBefore(div4, posparent.nextSibling);
                }
            } else if (dt == 'text upload') {
                //if value field is not already in form
                if (txtup == 0) {
                    if (funcs == 1) {
                        document.getElementById("inputFunction_" + streams).parentNode.remove();
                    }
                    if (rand == 1) {
                        document.getElementById("inputmin_" + streams).parentNode.remove();
                    }
                    if (sin == 1) {
                        document.getElementById("inputa_" + streams).parentNode.remove();
                    }
                    if (vals == 1) {
                        document.getElementById("inputValue_" + streams).parentNode.remove();
                    }
                    if (numup == 1) {
                        document.getElementById("inputNumericUpload_" + streams).parentNode.remove();
                    }

                    //create value field
                    var div5 = document.createElement("div");
                    div5.setAttribute("class", "form-group mt-4 group_" + streams);
                    var lable4 = document.createElement("label");
                    lable4.setAttribute("class", "small mb-1");
                    lable4.setAttribute("for", "inputTextUpload_" + streams);
                    lable4.innerText = "File";
                    var input2 = document.createElement("input");
                    input2.setAttribute('type', 'file');
                    input2.setAttribute('accept', '.txt');
                    input2.setAttribute("class", "form-control");
                    input2.setAttribute("id", "inputTextUpload_" + streams);
                    input2.setAttribute("placeholder", "Upload File");
                    input2.setAttribute("name", "inputTextUpload_" + streams);
                    div5.append(lable4);
                    div5.append(input2);

                    //append after datatype
                    var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
                    form.insertBefore(div5, posparent.nextSibling);
                }
            } else if (dt == 'numeric upload') {
                //if value field is not already in form
                if (numup == 0) {
                    if (funcs == 1) {
                        document.getElementById("inputFunction_" + streams).parentNode.remove();
                    }
                    if (rand == 1) {
                        document.getElementById("inputmin_" + streams).parentNode.remove();
                    }
                    if (sin == 1) {
                        document.getElementById("inputa_" + streams).parentNode.remove();
                    }
                    if (txtup == 1) {
                        document.getElementById("inputTextUpload_" + streams).parentNode.remove();
                    }
                    if (vals == 1) {
                        document.getElementById("inputValue_" + streams).parentNode.remove();
                    }

                    //create value field
                    var div6 = document.createElement("div");
                    div6.setAttribute("class", "form-group mt-4 group_" + streams);
                    var lable5 = document.createElement("label");
                    lable5.setAttribute("class", "small mb-1");
                    lable5.setAttribute("for", "inputNumericUpload_" + streams);
                    lable5.innerText = "Upload Numeric";
                    var input3 = document.createElement("input");
                    input3.setAttribute('type', 'file');
                    input3.setAttribute('accept', '.csv');
                    input3.setAttribute("class", "form-control");
                    input3.setAttribute("id", "inputNumericUpload_" + streams);
                    input3.setAttribute("placeholder", "Enter value");
                    input3.setAttribute("name", "inputNumericUpload_" + streams);
                    div6.append(lable5);
                    div6.append(input3);

                    //append after datatype
                    var posparent = document.getElementById("inputDatatype_" + streams).parentNode;
                    form.insertBefore(div6, posparent.nextSibling);
                }
            }

            $("#inputFunction_" + streams).on("change", function() {
                var func = document.getElementById("inputFunction_" + streams).value;

                //get number of stream fields in form
                var sin = form.querySelectorAll("#inputa_" + streams).length;
                var rand = form.querySelectorAll("#inputmin_" + streams).length;

                if (func == 'sin') {
                    //if sin field is not already in form
                    if (sin == 0) {
                        if (rand == 1) {
                            document.getElementById("inputmin_" + streams).parentNode.remove();
                        }

                        //create value field
                        var div = document.createElement("div");
                        div.setAttribute("class", "form-group mt-4 group_" + streams);

                        var lable = document.createElement("label");
                        lable.setAttribute("class", "small mb-1");
                        lable.setAttribute("for", "inputa_" + streams);
                        lable.innerText = "A";
                        var input = document.createElement("input");
                        input.setAttribute("class", "form-control");
                        input.setAttribute("id", "inputa_" + streams);
                        input.setAttribute("placeholder", "Enter A");
                        input.setAttribute("name", "inputa_" + streams);

                        var lable1 = document.createElement("label");
                        lable1.setAttribute("class", "small mb-1");
                        lable1.setAttribute("for", "inputb_" + streams);
                        lable1.innerText = "B";
                        var input1 = document.createElement("input");
                        input1.setAttribute("class", "form-control");
                        input1.setAttribute("id", "inputb_" + streams);
                        input1.setAttribute("placeholder", "Enter B");
                        input1.setAttribute("name", "inputb_" + streams);

                        var lable2 = document.createElement("label");
                        lable2.setAttribute("class", "small mb-1");
                        lable2.setAttribute("for", "inputc_" + streams);
                        lable2.innerText = "C";
                        var input2 = document.createElement("input");
                        input2.setAttribute("class", "form-control");
                        input2.setAttribute("id", "inputc_" + streams);
                        input2.setAttribute("placeholder", "Enter C");
                        input2.setAttribute("name", "inputc_" + streams);

                        var lable3 = document.createElement("label");
                        lable3.setAttribute("class", "small mb-1");
                        lable3.setAttribute("for", "inputd_" + streams);
                        lable3.innerText = "D";
                        var input3 = document.createElement("input");
                        input3.setAttribute("class", "form-control");
                        input3.setAttribute("id", "inputd_" + streams);
                        input3.setAttribute("placeholder", "Enter D");
                        input3.setAttribute("name", "inputd_" + streams);

                        var lable4 = document.createElement("label");
                        lable4.setAttribute("class", "small mb-1");
                        lable4.setAttribute("for", "inputi_" + streams);
                        lable4.innerText = "I";
                        var input4 = document.createElement("input");
                        input4.setAttribute("class", "form-control");
                        input4.setAttribute("id", "inputi_" + streams);
                        input4.setAttribute("placeholder", "Enter I");
                        input4.setAttribute("name", "inputi_" + streams);

                        var lable5 = document.createElement("label");
                        lable5.setAttribute("class", "small mb-1");
                        lable5.setAttribute("for", "inputSNominalMin_" + streams);
                        lable5.innerText = "Nominal Min";
                        var input5 = document.createElement("input");
                        input5.setAttribute("class", "form-control");
                        input5.setAttribute("id", "inputSNominalMin_" + streams);
                        input5.setAttribute("placeholder", "Enter nominal min");
                        input5.setAttribute("name", "inputSNominalMin_" + streams);

                        var lable6 = document.createElement("label");
                        lable6.setAttribute("class", "small mb-1");
                        lable6.setAttribute("for", "inputSNominalMax_" + streams);
                        lable6.innerText = "Nominal Max";
                        var input6 = document.createElement("input");
                        input6.setAttribute("class", "form-control");
                        input6.setAttribute("id", "inputSNominalMax_" + streams);
                        input6.setAttribute("placeholder", "Enter nominal max");
                        input6.setAttribute("name", "inputSNominalMax_" + streams);

                        div.append(lable);
                        div.append(input);
                        div.append(lable1);
                        div.append(input1);
                        div.append(lable2);
                        div.append(input2);
                        div.append(lable3);
                        div.append(input3);
                        div.append(lable4);
                        div.append(input4);
                        div.append(lable5);
                        div.append(input5);
                        div.append(lable6);
                        div.append(input6);

                        //append after function
                        var posparent = document.getElementById("inputFunction_" + streams).parentNode;
                        form.insertBefore(div, posparent.nextSibling);
                    }
                } else if (func == 'random') {
                    if (rand == 0) {
                        if (sin == 1) {
                            document.getElementById("inputa_" + streams).parentNode.remove();
                        }

                        //create value field
                        var div1 = document.createElement("div");
                        div1.setAttribute("class", "form-group mt-4 group_" + streams);

                        var lable5 = document.createElement("label");
                        lable5.setAttribute("class", "small mb-1");
                        lable5.setAttribute("for", "inputmin_" + streams);
                        lable5.innerText = "Min";
                        var input5 = document.createElement("input");
                        input5.setAttribute("class", "form-control");
                        input5.setAttribute("id", "inputmin_" + streams);
                        input5.setAttribute("placeholder", "Enter min");
                        input5.setAttribute("name", "inputmin_" + streams);

                        var lable6 = document.createElement("label");
                        lable6.setAttribute("class", "small mb-1");
                        lable6.setAttribute("for", "inputmax_" + streams);
                        lable6.innerText = "Max";
                        var input6 = document.createElement("input");
                        input6.setAttribute("class", "form-control");
                        input6.setAttribute("id", "inputmax_" + streams);
                        input6.setAttribute("placeholder", "Enter max");
                        input6.setAttribute("name", "inputmax_" + streams);

                        var lable7 = document.createElement("label");
                        lable7.setAttribute("class", "small mb-1");
                        lable7.setAttribute("for", "inputRNominalMin_" + streams);
                        lable7.innerText = "Nominal Min";
                        var input7 = document.createElement("input");
                        input7.setAttribute("class", "form-control");
                        input7.setAttribute("id", "inputRNominalMin_" + streams);
                        input7.setAttribute("placeholder", "Enter nominal min");
                        input7.setAttribute("name", "inputRNominalMin_" + streams);

                        var lable8 = document.createElement("label");
                        lable8.setAttribute("class", "small mb-1");
                        lable8.setAttribute("for", "inputRNominalMax_" + streams);
                        lable8.innerText = "Nominal Max";
                        var input8 = document.createElement("input");
                        input8.setAttribute("class", "form-control");
                        input8.setAttribute("id", "inputRNominalMax_" + streams);
                        input8.setAttribute("placeholder", "Enter nominal max");
                        input8.setAttribute("name", "inputRNominalMax_" + streams);

                        div1.append(lable5);
                        div1.append(input5);
                        div1.append(lable6);
                        div1.append(input6);
                        div1.append(lable7);
                        div1.append(input7);
                        div1.append(lable8);
                        div1.append(input8);

                        //append after function
                        var posparent = document.getElementById("inputFunction_" + streams).parentNode;
                        form.insertBefore(div1, posparent.nextSibling);
                    }
                }
            });
        });
    }

})(jQuery);

function validate() {
    var res = true;

    var form = document.getElementById("createForm");
    var streams = form.querySelectorAll('.stream').length;
    var panelname = document.getElementById('inputPanelname').value.trim();

    if (streams == 0) {
        alert('Cannot create panel without streams');
        res = false;
    } else if (panelname == '') {
        alert('Panel name is required');
        res = false;
    }

    for (i = 1; i < streams + 1; i++) {
        var dn = document.getElementById('inputDataname_' + i).value.trim();
        var dt = document.getElementById('inputDatatype_' + i).value;

        if (dn == '') {
            alert('dataname required for stream ' + i);
            res = false;
        } else {
            //check for duplicate datanames
            for (k = 1; k < streams + 1; k++) {
                var ndn = document.getElementById('inputDataname_' + k).value.trim();

                if (k != i) {
                    if (dn == ndn) {
                        alert('dataname must be unique for stream ' + i);
                        res = false;
                    }
                }
            }
        }

        if (dt == 'text') {
            var value = document.getElementById('inputValue_' + i).value.trim();
            var nominal = document.getElementById('inputNominal_' + i).value.trim();
            if (value == '') {
                alert('value fields is required for stream ' + i);
                res = false;
            } else if (nominal == '') {
                alert('nominal field is required for stream ' + i);
                res = false;
            }
        } else if (dt == 'numeric') {
            var num = document.getElementById('inputFunction_' + i).value;
            if (num == 'sin') {
                var a = document.getElementById('inputa_' + i).value.trim();
                var b = document.getElementById('inputb_' + i).value.trim();
                var c = document.getElementById('inputc_' + i).value.trim();
                var d = document.getElementById('inputd_' + i).value.trim();
                var inc = document.getElementById('inputi_' + i).value.trim();
                var nominal_min = document.getElementById('inputSNominalMin_' + i).value.trim();
                var nominal_max = document.getElementById('inputSNominalMax_' + i).value.trim();

                if (a == '' || b == '' || c == '' || d == '' || inc == '') {
                    alert('all numeric sin values are required for stream ' + i);
                    res = false;
                } else if (nominal_min == '' || nominal_max == '') {
                    alert('all nominal values are required for stream ' + i);
                    res = false;
                }
            } else if (num == 'random') {
                var min = document.getElementById('inputmin_' + i).value.trim();
                var max = document.getElementById('inputmax_' + i).value.trim();
                var nominal_min = document.getElementById('inputRNominalMin_' + i).value.trim();
                var nominal_max = document.getElementById('inputRNominalMax_' + i).value.trim();

                if (min == '' || max == '') {
                    alert('all numeric random values are required for stream ' + i);
                    res = false;
                } else if (nominal_min == '' || nominal_max == '') {
                    alert('all nominal values are required for stream ' + i);
                    res = false;
                }
            } else {
                alert('numerical function must be selected for stream ' + i);
                res = false;
            }
        } else if (dt == 'text upload') {
            var txtup = document.getElementById('inputTextUpload_' + i).value.trim();
            if (txtup == '') {
                alert('file field is required for stream ' + i);
                res = false;
            }
        } else if (dt == 'numeric upload') {
            var numup = document.getElementById('inputNumericUpload_' + i).value.trim();
            if (numup == '') {
                alert('file field is required for stream ' + i);
                res = false;
            }
        } else {
            alert('datatype required for stream ' + i);
            res = false;
        }
    }

    return res;
}

function text(dn, val, nominal) {
    var data = {
        dataname: dn,
        datatype: "string",
        value: val,
        nominal: nominal
    }

    return data;
}

function sin(dn, a, b, c, d, i, nominal_min, nominal_max) {
    var data = {
        dataname: dn,
        datatype: "float",
        function: "sin",
        a: a,
        b: b,
        c: c,
        d: d,
        i: i,
        nominal_min: nominal_min,
        nominal_max: nominal_max
    }

    return data;
}

function random(dn, min, max, nominal_min, nominal_max) {
    var data = {
        dataname: dn,
        datatype: "float",
        function: "random",
        min: min,
        max: max,
        nominal_min: nominal_min,
        nominal_max: nominal_max
    }

    return data;
}