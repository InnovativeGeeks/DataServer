<!--
    Created by Ryan Draper
    33152216
-->
<!DOCTYPE html>
<html>

<head>
    <title>Panels</title>
    <script type="text/javascript" src="../js/panels.js"></script>
    <link rel="stylesheet" href="../css/panels.css"/>
</head>

<body onload="loadPanels()">
    <h1>Panels</h1>
    <div id="panelContainer" class="panParent">
        <div id="panels" class="panChild"></div>
        <div id="panelInfo" class="panChild"></div>
    </div>
    <form id="panelForm" method="post" action="./createPanel.php">
        <!-- Store username and password in hidden input for post -->
        <input type="text" hidden="true" name="username" id="username" value="<?php echo $_POST['username'] ?>"></input>
        <input type="text" hidden="true" name="password" id="password" value="<?php echo $_POST['password'] ?>"></input>

        <input type="submit" id="createPanel" value="create panel" />
    </form>
</body>

</html>