<?php
    require_once "./databaseConnect.php";

    $conn = newconn();

    //select query
    $sql = "SELECT * FROM users;";
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
</head>
<body class="sb-nav-fixed">
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand" href="../html/panels.html">Numerous</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#!">
        <i class="fas fa-bars"></i></button>


    <!-- Navbar-->
    <ul class="navbar-nav ml-auto ml-md-0">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="userDropdown" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
        </li>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <a class="dropdown-item" href="#!">Settings</a>
            <a class="dropdown-item" href="#!">Activity Log</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="login.html">Logout</a>
        </div>
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
                    <a class="nav-link" href="../html/panels.html">
                        <div class="sb-nav-link-icon">
                            <i class="fas fa-columns"></i></div>
                        Panels Home
                    </a>
                    <a class="nav-link" href="../html/createpanel.html">
                        <div class="sb-nav-link-icon">
                            <i class="far fa-plus-square"></i></div>
                        Create Panel
                    </a>
                    <a class="nav-link" href="../html/updatepanel.html">
                        <div class="sb-nav-link-icon"><i class="far fa-edit"></i></div>
                        Update Panel
                    </a>
                    <a class="nav-link" href="../html/deletepanel.html">
                        <div class="sb-nav-link-icon"><i class="far fa-trash-alt"></i></div>
                        Delete Panel
                    </a>


                    <div class="sb-sidenav-menu-heading text-light mb-2" id="user"></div>
                    <span class="border-primary border-bottom"></span>
                    <a class="nav-link" href="../php/user.php">
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
                        DataTable Example
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Control</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Control</th>
                                </tr>
                                </tfoot>
                                <tbody>

                                <?php
                                    foreach ($count as $value){
                                ?>
                                <tr>
                                    <td><?php echo $value['username'];?></td>
                                    <td><?php echo $value['password'];?></td>
                                    <td><?php echo $value['role'];?></td>
                                    <td>
                                        <a href="./user_del.php?username=<?php echo $value['username'];?>" class="btn btn-primary active" role="button">Delete</a>
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
</body>
</html>
