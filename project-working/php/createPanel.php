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

<body>
    <h1>Create Panel</h1>

    <form enctype="multipart/form-data" id="dataform" method="post" onsubmit="return validate()" action="../php/savePanel.php">
        <input type="text" hidden="true" name="username" id="username" value="<?php echo $_POST['username'] ?>"></input>
        <input type="text" hidden="true" name="password" id="password" value="<?php echo $_POST['password'] ?>"></input>
        <!--
        <div id="sourcedata">
            <label for="source">Source</label><br />
            <select id="source" name="source">
                <option>csv</option>
                <option>image</option>
                <option>text</option>
                <option>numeric</option>
            </select>

            <select id="function" hidden="true" name="numericFunc">
                <option>sin</option>
            </select><br /><br />
-->     <label for="panelname">Panel Name</label><br />
        <input type="text" name="panelname" id="panelname" /><br /><br />
        <input type="submit" id="add" value="save panel" />
    </form>
</body>

</html>