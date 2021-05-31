<?php
require_once "./databaseConnect.php";

$conn = newconn();

//select query
$sql = "SELECT * FROM users NATURAL JOIN roles WHERE role = role_id;";
$result = mysqli_query($conn, $sql);

$count = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Numerous - SB Admin</title>
    <link href="../css/styles.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/dee192e6cc.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <p class="navbar-brand">Numerous</p>
        <button class="btn btn-link btn-sm order-first ml-2" id="sidebarToggle" href="#!"><i
                class="fas fa-bars"></i></button>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" data-target="userDropdown" href="#">
                    <i class="fas fa-user"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <div class="ml-4 text-primary" id="loggedinUser"></div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#accountsettings.html"><i class="fas fa-user-cog"></i> Settings</a>
                    <a class="dropdown-item" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading text-light mb-2" id="usernav"></div>
                        <span class="border-primary border-bottom"></span>

                        <div class="sb-sidenav-menu-heading">Panels</div>
                        <a class="nav-link" href="../html/panels.html" id="home">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            Panels Home
                        </a>
                        <a class="nav-link" href="../html/createpanel.html" hidden="true" id="create">
                            <div class="sb-nav-link-icon"><i class="far fa-plus-square"></i></div>
                            Create Panel
                        </a>
                        <a class="nav-link" href="../html/updatepanel.html" hidden="true" id="update">
                            <div class="sb-nav-link-icon"><i class="far fa-edit"></i></div>
                            Update Panel
                        </a>
                        <a class="nav-link" href="../html/addstream.html" hidden="true" id="add">
                            <div class="sb-nav-link-icon"><i class="far fa-edit"></i></div>
                            Add Stream
                        </a>
                        <a class="nav-link" href="../html/deletepanel.html" hidden="true" id="delete">
                            <div class="sb-nav-link-icon"><i class="far fa-trash-alt"></i></div>
                            Delete Panel
                        </a>
                        <div class="sb-sidenav-menu-heading text-light mb-2" id="user"></div>
                        <span class="border-primary border-bottom"></span>
                        <a class="nav-link" href="./user.php" hidden="true" id="manager">
                            <div class="sb-nav-link-icon"><i class="far fa-edit"></i></div>
                            User Manager
                        </a>
                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid">
                    <h1 class="mt-4">User Tables</h1>

                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                            Users
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Control</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <?php
                                        foreach ($count as $value) {
                                        ?>
                                            <tr>
                                                <td><?php echo $value['username']; ?></td>
                                                <td><?php echo $value['role_name']; ?></td>
                                                <td>
                                                    <a href="?username=<?php echo $value['username']; ?>" class="btn btn-primary active" role="button">Assign Panel</a>
                                                    <a href="?username=<?php echo $value['username']; ?>" class="btn btn-primary active" role="button">Change Role</a>
                                                    <a href="./user_del.php?username=<?php echo $value['username']; ?>" class="btn btn-primary active" role="button">Delete</a>
                                                </td>
                                            </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; InnovativeGeeks 2021</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../js/scripts.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
    <script src="../assets/demo/datatables-demo.js"></script>
    <script>
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
                    $("#cardhead").html(txt);
                });
                })(jQuery);
    </script>
</body>

</html>