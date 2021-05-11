<!DOCTYPE html>
<html>

<head>
    <title>sin function stream</title>
    <link rel="stylesheet" type="text/css" href="../css/sinFunction.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
    <form class="form-container" onsubmit="return validate()">
        <p id="error"></p>
        <h3>f(x) = a sin (bx+c) + d</h3>
        <h4>please enter the values a,b,c and d to generate the function value</h4>
        <div class="form-grp">
            <label for="a"> a(amplitude)</label><br>
            <input type="number" step="any" name="a" placeholder="a(amplitude)" id="a">
        </div>
        <div class="form-grp">
            <label for="b"> b(horizontal dilation)</label><br>
            <input type="number" step="any" name="b" placeholder="b(horizontal dilation)" id="b">
        </div>
        <div class="form-grp">
            <label for="c"> c(phase shift)</label><br>
            <input type="number" step="any" name="c" placeholder="c(phase shift)" id="c">
        </div>
        <div class="form-grp">
            <label for="d"> d(vertical translation)</label><br>
            <input type="number" step="any" name="d" placeholder="d(vertical translation)" id="d">
        </div>
        <div class="form-grp">
            <label for="d"> increment value</label><br>
            <input type="number" step="any" name="d" placeholder="increment value" id="i">
        </div>
        <div class="form-grp">
            <input type="submit" name="calulcate-button" value="caluculate">
        </div>
    </form>
</body>
<script type="text/javascript">
    function validate() {

        var values = {
            amplitude: document.getElementById('a').value,
            horizontalDilation: document.getElementById('b').value,
            phaseShift: document.getElementById('c').value,
            verticalTranslation: document.getElementById('d').value,
            incrementValue: document.getElementById('i').value
        };

        fetch('./sinFunctionprocess.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(err => console.log(err));

        return false;
    }
</script>

</html>