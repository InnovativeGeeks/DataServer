<?

/**
 * Created by Ryan Draper
 * 33152216
 */
?>
<!DOCTYPE html>
<html>

<head>
    <title>Create Panel</title>
    <script src="../js/createPanel.js"></script>
</head>

<body onload="addStream()">
    <h1>Create Panel</h1>

    <form enctype="multipart/form-data" id="dataform" method="post" onsubmit="return validate()" action="../php/savePanel.php">
        <input type="text" hidden="true" name="username" id="username" value="<?php echo $_POST['username'] ?>"></input>
        <input type="text" hidden="true" name="password" id="password" value="<?php echo $_POST['password'] ?>"></input>
        
        <label for="panelname">Panel Name</label><br />
        <input type="text" name="panelname" id="panelname" /><br /><br />

        <input type="submit" id="add" value="save panel" />
    </form><br/><br/>
    <div id="addedstreams">
        <h3>Streams</h3>
    </div><br/>
    <div id="stream"></div>
    <div id="uploadingStream"></div>
</body>

</html>